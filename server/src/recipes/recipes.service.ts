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
import { RecipeType } from './entities/recipe-type.entity';
import { QueryDto } from './dto/query.dto';
import { QueryProductDto } from './dto/query-products.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
    @InjectRepository(RecipeType)
    private readonly recipeTypeRepository: Repository<RecipeType>,
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
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'average_rating')
      .leftJoin('recipe.likedRecipes', 'liked')
      .addSelect(['liked.user_id', 'liked.recipe_id'])
      .groupBy(
        'recipe.recipe_id, liked.recipe_id, liked.user_id, liked.like_id',
      )
      .getRawAndEntities();

    return recipes.entities.map((recipeEntity, index) => {
      const raw = recipes.raw[index];
      return {
        ...recipeEntity,
        averageRating: parseFloat(raw.average_rating),
        recipe_saved: userId ? raw.recipe_saved : false,
      };
    });
  }

  async getAllRecipes(queryDto: QueryDto) {
    const query = this.recipeRepository
    .createQueryBuilder('recipe')
    .leftJoin('recipe.recipe_type', 'recipe_type')
    .addSelect(['recipe_type.name'])
    .leftJoin('recipe.author', 'author')
    .addSelect(['author.username','author.first_name', 'author.last_name', 'author.image'])
    .leftJoin('recipe.liked_recipes', 'liked')
    .addSelect('liked.user_id')
    .leftJoin('recipe.ratings', 'rating')
    .addSelect('CAST(COALESCE(AVG(rating.rating), 0) AS FLOAT)', 'average_rating')
    .groupBy(
      `recipe.recipe_id, recipe_type.name, recipe_type.id, recipe_type.image, 
      author.user_id, liked.user_id, liked.recipe_id, liked.like_id`
    )
  
    if (queryDto.name) {
      query.andWhere('recipe.name ILIKE :name', { name: `%${queryDto.name}%` });
    }
  
    if (queryDto.recipe_type_name) {
      query.andWhere('recipe_type.name = :recipeTypeName', { recipeTypeName: queryDto.recipe_type_name });
    }
  
    const result = await query.getRawAndEntities();

    const recipes = result.entities.map((recipe, index) => ({
      ...recipe,
      average_rating: parseFloat(result.raw[index].average_rating)
    }));

    return recipes;
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
      .addSelect(['rating.rating', 'rating.description'])
      .leftJoin('recipe.recipe_type', 'recipe_type')
      .addSelect(['recipe_type.name'])
      .leftJoin('recipe.author', 'author')
      .addSelect(['author.username','author.first_name', 'author.last_name', 'author.image'])
      .leftJoin('recipe.steps_details', 'step')
      .addSelect(['step.step_number', 'step.description'])
      .leftJoin('recipe.ingredients', 'ingredient')
      .addSelect('ingredient.quantity')
      .leftJoinAndSelect('ingredient.product', 'product')
      .leftJoin('recipe.liked_recipes', 'liked')
      .addSelect('liked.user_id')
      .leftJoin('rating.rater', 'rater')
      .addSelect(['rater.user_id', 'rater.username', 'rater.first_name', 'rater.last_name', 'rater.image'])
      .addSelect('CAST(COALESCE(AVG(rating.rating), 0) AS FLOAT)', 'averageRating')
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .groupBy(
        `recipe.recipe_id, recipe_type.name, recipe_type.id, recipe_type.image, 
        author.user_id, rating.rating_id, rater.user_id, rater.username, rater.first_name, rater.last_name, rater.image,
        step.step_id, ingredient.ingredient_id, product.product_id, liked.user_id, liked.recipe_id, liked.like_id`
      )
      .getMany();

    if (!recipe.length) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }

  async createRecipe(createRecipeDto: CreateRecipeDto, user: TokenPayload): Promise<RecipeEntity> {
    return this.runInTransaction(async (queryRunner) => {
      const { name, image, recipe_type_name, stepsDetails, ingredients } = createRecipeDto;

      const recipeType = await queryRunner.manager.findOneOrFail(RecipeType, { where: { name: recipe_type_name } });

      // Recipe
      const recipe = new RecipeEntity();
      recipe.name = name;
      recipe.image = image;
      recipe.recipe_type = recipeType; 
      recipe.author_id = user.sub;

      const savedRecipe = await queryRunner.manager.save(recipe); // Save Recipe

      // Steps
      let stepNumber = 1;
      for (const stepDto of stepsDetails) {
        const step = new StepEntity();
        step.description = stepDto.description;
        step.step_number = stepNumber++;
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

  async updateRecipe(recipeId: number, updateRecipeDto: UpdateRecipeDto, user: TokenPayload): Promise<RecipeEntity> {
    return this.runInTransaction(async (queryRunner) => {
      const recipe = await queryRunner.manager.findOne(RecipeEntity, {
        where: { recipe_id: recipeId },
        relations: ['recipeType'],
      });

      if (!recipe) {
        throw new NotFoundException('recipe-not-found');
      }

      if (recipe.author_id !== user.sub) {
        throw new UnauthorizedException();
      }

      recipe.name = updateRecipeDto.name ?? recipe.name;
      recipe.image = updateRecipeDto.image ?? recipe.image;

      if (updateRecipeDto.recipe_type_name) {
        const recipeType = await queryRunner.manager.findOneOrFail(RecipeType, { where: { name: updateRecipeDto.recipe_type_name } });
        recipe.recipe_type = recipeType; // Update recipe type based on name
      }

      if (updateRecipeDto.stepsDetails) {
        await queryRunner.manager.delete(StepEntity, {
          recipe: { recipe_id: recipeId },
        });

        let stepNumber = 1;
        const steps = updateRecipeDto.stepsDetails.map((stepDto) => {
          const step = new StepEntity();
          step.description = stepDto.description;
          step.step_number = stepNumber++;
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

  async getRecipeNutritionalInfo(recipeId: number) {
    const recipe = await this.recipeRepository.findOne({
      where: {recipe_id : recipeId},
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const nutritionalInfo = await this.ingredientRepository
      .createQueryBuilder('ingredient')
      .leftJoin('ingredient.product', 'product')
      .select([
        'SUM(product.calories * ingredient.quantity) AS totalCalories',
        'SUM(product.percent_carbs * ingredient.quantity) AS totalCarbs',
        'SUM(product.percent_fats * ingredient.quantity) AS totalFats',
        'SUM(product.percent_protein * ingredient.quantity) AS totalProtein',
      ])
      .where('ingredient.recipe_id = :recipeId', { recipeId })
      .getRawOne();

    return nutritionalInfo;
  }

  async getRecipesByProducts(query: QueryProductDto) {
    const { productNames } = query;
    const lowercasedProductNames = productNames.map(name => `%${name.toLowerCase()}%`);
  
    const recipes = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoin('recipe.ingredients', 'ingredient')
      .leftJoin('ingredient.product', 'product')
      .select([
        'recipe.recipe_id',
        'recipe.name',
        'recipe.image',
        'recipe.recipe_type',
      ])
      .leftJoin('recipe.ratings', 'rating')
      .addSelect('CAST(COALESCE(AVG(rating.rating), 0) AS FLOAT)', 'averageRating')
      .leftJoin('recipe.author', 'author')
      .addSelect([
        'author.username',
        'author.first_name',
        'author.last_name',
        'author.image',
      ])
      .leftJoin('recipe.liked_recipes', 'liked')
      .addSelect(['liked.user_id', 'liked.recipe_id'])
      .where(
        productNames.length === 1
          ? 'product.product_name ILIKE :lowercasedProductName'
          : 'product.product_name ILIKE (:lowercasedProductNames)',
        productNames.length === 1
          ? { lowercasedProductName: lowercasedProductNames[0] }
          : { lowercasedProductNames }
      )
      .groupBy('recipe.recipe_id, author.user_id, liked.recipe_id, liked.user_id, liked.like_id')
      .getRawAndEntities();
  
    if (!recipes.entities.length) {
      throw new NotFoundException('recipes-not-found');
    }
  
    return recipes.entities.map(recipeEntity => recipeEntity);
  }
  

  async getRecipeTypes(){
    return this.recipeTypeRepository.find();
  }
}


