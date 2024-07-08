import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, getManager } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { TokenPayload } from 'src/auth/models/token.model';
import { RecipeView } from './entities/multi-recipe-view.entity';
import { StepEntity } from 'src/steps/entities/step.entity';
import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(RecipeView)
    private readonly multiRecipeViewRepository: Repository<RecipeView>,
    @InjectRepository(StepEntity)
    private readonly stepRepository: Repository<StepEntity>,
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getRecipesByUserId(id: number): Promise<RecipeEntity[]> {
    return await this.recipeRepository.find({
      where: { author_id: id },
      relations: ['author', 'ratings', 'stepsDetails'],
    });
  }

  getAllRecipes(): Promise<RecipeView[]> {
    return this.multiRecipeViewRepository.find();
  }

  async getSimpleRecipeById(recipeId: number): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: { recipe_id: recipeId },
    });
    if (!recipe) {
      throw new NotFoundException(`recipe-not-found`);
    }
    return recipe;
  }

  async getRecipeById(recipeId: number) {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.ratings', 'rating')
      .leftJoinAndSelect('recipe.stepsDetails', 'step')
      .leftJoin('recipe.likedRecipes', 'likedRecipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .loadRelationCountAndMap('recipe.likes', 'recipe.likedRecipes')
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'averageRating')
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .groupBy(
        'recipe.recipe_id, author.user_id, rating.rating_id, step.step_id',
      )
      .getRawAndEntities();

    if (!recipe.entities.length) {
      throw new NotFoundException(`recipe-not-found`);
    }

    const recipeEntity = recipe.entities[0];
    const raw = recipe.raw[0];

    return {
      ...recipeEntity,
      author: recipeEntity.author
        ? {
            user_id: recipeEntity.author.user_id,
            username: recipeEntity.author.username,
            first_name: recipeEntity.author.first_name,
            last_name: recipeEntity.author.last_name,
            image: recipeEntity.author.image,
          }
        : null,
      likes: recipeEntity.likes || 0,
      averageRating: parseFloat(raw.averageRating),
    };
  }

  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    const { name, image, recipe_type, stepsDetails, ingredients } =
      createRecipeDto;
    const queryRunner = this.entityManager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Recipe
      const recipe = new RecipeEntity();
      recipe.name = name;
      recipe.image = image;
      recipe.recipe_type = recipe_type;
      recipe.author_id = user.sub;

      const savedRecipe = await queryRunner.manager.save(recipe); // Save Recipe

      // Steps
      for (const stepDto of stepsDetails) {
        const step = new StepEntity();
        step.description = stepDto.description;
        step.step_number = stepDto.step_number;
        step.recipe = savedRecipe;
        await queryRunner.manager.save(step); // Save each step
      }

      // Ingredients
      for (const ingredientDto of ingredients) {
        const product = await this.productRepository.findOne({
          where: { product_id: ingredientDto.product_id },
        });
        if (!product) {
          throw new BadRequestException('product-not-found');
        }

        const ingredient = new IngredientEntity();
        ingredient.product = product;
        ingredient.quantity = ingredientDto.quantity;
        ingredient.unit = ingredientDto.unit;
        ingredient.recipe = savedRecipe;
        await queryRunner.manager.save(ingredient); // Save each ingredient
      }

      await queryRunner.commitTransaction();
      return savedRecipe;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateRecipe(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    const queryRunner =
      this.recipeRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const recipe = await queryRunner.manager.findOne(RecipeEntity, {
        where: { recipe_id: id },
      });

      if (!recipe) {
        throw new NotFoundException('recipe-not-found');
      }

      if (recipe.author_id !== user.sub) {
        throw new UnauthorizedException();
      }

      recipe.name = updateRecipeDto.name ?? recipe.name;
      recipe.image = updateRecipeDto.image ?? recipe.image;
      recipe.recipe_type = updateRecipeDto.recipe_type ?? recipe.recipe_type;

      if (updateRecipeDto.stepsDetails) {
        await queryRunner.manager.delete(StepEntity, {
          recipe: { recipe_id: id },
        });

        const steps = updateRecipeDto.stepsDetails.map((stepDto) => {
          const step = new StepEntity();
          step.description = stepDto.description;
          step.step_number = stepDto.step_number;
          step.recipe = recipe;
          return step;
        });

        await queryRunner.manager.save(steps);
      }

      if (updateRecipeDto.ingredients) {
        await queryRunner.manager.delete(IngredientEntity, {
          recipe: { recipe_id: id },
        });

        const ingredients = updateRecipeDto.ingredients.map(
          async (ingredientDto) => {
            const product = await this.productRepository.findOne({
              where: { product_id: ingredientDto.product_id },
            });
            if (!product) {
              throw new BadRequestException('product-not-found');
            }

            const ingredient = new IngredientEntity();
            ingredient.product = product;
            ingredient.quantity = ingredientDto.quantity;
            ingredient.unit = ingredientDto.unit;
            ingredient.recipe = recipe;
            return ingredient;
          },
        );

        await queryRunner.manager.save(
          IngredientEntity,
          await Promise.all(ingredients),
        );
      }

      await queryRunner.manager.save(RecipeEntity, recipe);

      await queryRunner.commitTransaction();
      return recipe;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteRecipe(id: number, user: TokenPayload): Promise<void> {
    const recipe = await this.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('recipe-not-found');
    }
    if (recipe.author_id !== user.sub) {
      throw new UnauthorizedException();
    }
    await this.recipeRepository.delete(id);
  }
}
