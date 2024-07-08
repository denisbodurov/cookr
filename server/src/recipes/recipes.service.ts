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
    const recipes = this.recipeRepository
      .createQueryBuilder('recipe')
      .select([
        'recipe.recipe_id AS recipe_id',
        'recipe.name AS recipe_name',
        'recipe.image AS recipe_image',
        'recipe.created_at AS created_at',
        'author.username AS author_username',
        'CAST(COALESCE(AVG(rating.rating), 0) AS FLOAT) AS average_rating',
      ])
      .leftJoin('recipe.author', 'author')
      .leftJoin('recipe.ratings', 'rating')
      .groupBy('recipe.recipe_id, author.user_id')
      .orderBy('recipe.created_at', 'DESC')
      .getRawMany();

    return recipes;
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
      .select([
        'recipe.recipe_id AS recipe_id',
        'recipe.name AS recipe_name',
        'recipe.image AS recipe_image',
        'recipe.recipe_type AS recipe_type',
        'recipe.created_at AS created_at',
        'recipe.updated_at AS updated_at',
        'author.user_id AS author_id',
        'author.username AS author_username',
        'author.first_name AS author_first_name',
        'author.last_name AS author_last_name',
        'COALESCE(COUNT(DISTINCT likedRecipe.like_id), 0) AS like_count',
        'CAST(COALESCE(AVG(rating.rating), 0) AS FLOAT) AS average_rating',
      ])
      .leftJoin('recipe.author', 'author')
      .leftJoin('recipe.likedRecipes', 'likedRecipe')
      .leftJoin('recipe.ratings', 'rating')
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .groupBy('recipe.recipe_id, author.user_id')
      .getRawOne();

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found.`);
    }

    const steps = await this.recipeRepository
      .createQueryBuilder('recipe')
      .select([
        'step.step_id AS step_id',
        'step.step_number AS step_number',
        'step.description AS description',
      ])
      .leftJoin('recipe.stepsDetails', 'step')
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .orderBy('step.step_number', 'ASC')
      .getRawMany();

    const ingredients = await this.recipeRepository
      .createQueryBuilder('recipe')
      .select([
        'ingredient.ingredient_id AS ingredient_id',
        'ingredient.quantity AS quantity',
        'product.product_id AS product_id',
        'product.product_name AS product_name',
        'product.image AS product_image',
        'product.unit AS unit',
        'product.percent_carbs AS percent_carbs',
        'product.percent_fats AS percent_fats',
        'product.percent_protein AS percent_protein',
        'product.calories AS calories',
        'product.product_type AS product_type',
      ])
      .leftJoin('recipe.ingredients', 'ingredient')
      .leftJoin('ingredient.product', 'product')
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .getRawMany();

    return {recipe, steps, ingredients};
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
        //ingredient.unit = ingredientDto.unit;
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
            //ingredient.unit = ingredientDto.unit;
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
    if (recipe.recipe.author_id !== user.sub) {
      throw new UnauthorizedException();
    }
    await this.recipeRepository.delete(id);
  }
}
