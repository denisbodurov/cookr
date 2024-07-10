import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { TokenPayload } from 'src/auth/models/token.model';
import { StepEntity } from 'src/steps/entities/step.entity';
import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getRecipesByUserId(userId: number) {
    const recipes = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoin('recipe.ratings', 'rating')
      .select([
        'recipe.recipe_id',
        'recipe.name',
        'recipe.image',
        'recipe.recipe_type',
      ])
      .leftJoin('recipe.author', 'author')
      .where('author.user_id = :userId', { userId })
      .addSelect([
        'author.username',
        'author.first_name',
        'author.last_name',
        'author.image',
      ])
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'averageRating')
      .leftJoin('recipe.likedRecipes', 'liked')
      .addSelect(['liked.user_id', 'liked.recipe_id'])
      .groupBy(
        'recipe.recipe_id, author.user_id, liked.recipe_id, liked.user_id, liked.like_id',
      )
      .getRawAndEntities();

    return recipes.entities.map((recipeEntity, index) => {
      const raw = recipes.raw[index];
      return {
        ...recipeEntity,
        averageRating: parseFloat(raw.averageRating),
        recipe_saved: userId ? raw.recipe_saved : false,
      };
    });
  }

  async getAllRecipes(query) {
    const qb = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoin('recipe.ratings', 'rating')
      .select([
        'recipe.recipe_id',
        'recipe.name',
        'recipe.image',
        'recipe.recipe_type',
      ])
      .leftJoin('recipe.author', 'author')
      .addSelect([
        'author.username',
        'author.first_name',
        'author.last_name',
        'author.image',
      ])
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'averageRating')
      .leftJoin('recipe.likedRecipes', 'liked')
      .addSelect(['liked.user_id', 'liked.recipe_id'])
      .groupBy(
        'recipe.recipe_id, author.user_id, liked.recipe_id, liked.user_id, liked.like_id',
      );

    if (query.recipeType) {
      qb.andWhere('recipe.recipe_type = :recipeType', {
        recipeType: query.recipeType,
      });
    }
    if (query.productCategory) {
      qb.andWhere('recipe.product_category = :productCategory', {
        productCategory: query.productCategory,
      });
    }
    if (query.name) {
      qb.andWhere('recipe.name LIKE :name', { name: `%${query.name}%` });
    }

    const recipes = await qb.getRawAndEntities();

    if (!recipes.entities.length) {
      throw new NotFoundException(`recipes-not-found`);
    }

    return recipes.entities.map((recipeEntity, index) => {
      const raw = recipes.raw[index];
      return {
        ...recipeEntity,
        averageRating: parseFloat(raw.averageRating),
      };
    });
  }

  async getSimpleRecipeById(recipeId: number) {
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
      .leftJoin('recipe.ratings', 'rating')
      .select([
        'recipe.name',
        'rating.rating',
        'recipe.image',
        'recipe.recipe_type',
      ])
      .leftJoin('rating.rater', 'ratingAuthor')
      .addSelect([
        'ratingAuthor.user_id',
        'ratingAuthor.username',
        'ratingAuthor.first_name',
        'ratingAuthor.last_name',
        'ratingAuthor.image',
        'rating.description',
      ])
      .leftJoin('recipe.stepsDetails', 'step')
      .addSelect(['step.description', 'step.step_number'])
      .leftJoin('recipe.ingredients', 'ingredient')
      .leftJoin('ingredient.product', 'product')
      .addSelect([
        'ingredient.quantity',
        'product.product_name',
        'product.product_type',
        'product.percent_fats',
        'product.percent_carbs',
        'product.percent_protein',
        'product.calories',
      ])
      .leftJoin('recipe.author', 'author')
      .addSelect([
        'author.username',
        'author.first_name',
        'author.last_name',
        'author.image',
      ])
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'averageRating')
      .leftJoin('recipe.likedRecipes', 'liked')
      .addSelect(['liked.user_id', 'liked.recipe_id'])
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .groupBy(
        `recipe.recipe_id, author.user_id, rating.rating_id,
        ratingAuthor.username, ratingAuthor.first_name,
        ratingAuthor.last_name, ratingAuthor.image,
        step.step_id, ingredient.quantity, ingredient.ingredient_id,
        product.product_id, product.product_name, product.product_type,
        ratingAuthor.user_id, liked.recipe_id, liked.user_id, liked.like_id`,
      )
      .getRawAndEntities();

    const recipeEntity = recipe.entities[0];
    const raw = recipe.raw[0];

    if (!recipeEntity || !raw) {
      throw new NotFoundException(`recipe-not-found`);
    }

    return {
      ...recipeEntity,
      averageRating: parseFloat(raw.averageRating),
    };
  }

  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    return this.runInTransaction(async (queryRunner) => {
      const { name, image, recipe_type, stepsDetails, ingredients } = createRecipeDto;
  
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
          throw new BadRequestException(`Product with ID ${ingredientDto.product_id} not found`);
        }
  
        const ingredient = new IngredientEntity();
        ingredient.product = product;
        ingredient.quantity = ingredientDto.quantity;
        ingredient.recipe = savedRecipe;
        await queryRunner.manager.save(ingredient);
      }
  
      return savedRecipe;
    });
  }

  async updateRecipe(
    recipeId: number,
    updateRecipeDto: UpdateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    return this.runInTransaction(async (queryRunner) => {
      const recipe = await queryRunner.manager.findOne(RecipeEntity, {
        where: { recipe_id: recipeId },
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
          recipe: { recipe_id: recipeId },
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
          recipe: { recipe_id: recipeId },
        });
  
        for (const ingredientDto of updateRecipeDto.ingredients) {
          const product = await this.productRepository.findOne({
            where: { product_id: ingredientDto.product_id },
          });
          if (!product) {
            throw new BadRequestException(`Product with ID ${ingredientDto.product_id} not found`);
          }
  
          const ingredient = new IngredientEntity();
          ingredient.product = product;
          ingredient.quantity = ingredientDto.quantity;
          ingredient.recipe = recipe;
          await queryRunner.manager.save(ingredient);
        }
      }
  
      await queryRunner.manager.save(RecipeEntity, recipe);
      return recipe;
    });
  }  

  async deleteRecipe(recipeId: number, user: TokenPayload) {
    const recipe = await this.getSimpleRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException('recipe-not-found');
    }
    if (recipe.author_id !== user.sub) {
      throw new UnauthorizedException();
    }
    await this.recipeRepository.delete(recipeId);
  }
  
  // Transaction helper
  async runInTransaction<T>(work: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = this.recipeRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const result = await work(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}


