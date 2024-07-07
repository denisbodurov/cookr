import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { TokenPayload } from 'src/auth/models/token.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  async getRecipesByUserId(id: number): Promise<RecipeEntity[]> {
    return await this.recipeRepository.find({
      where: { author_id: id },
      relations: ['author', 'ratings', 'stepsDetails'],
    });
  }

  async getAllRecipes(): Promise<any[]> {
    const recipes = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .leftJoin('recipe.ratings', 'rating')
      .leftJoin('recipe.likedRecipes', 'likedRecipe')
      .loadRelationCountAndMap('recipe.likes', 'recipe.likedRecipes')
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'recipe_averageRating')
      .groupBy('recipe.recipe_id, author.user_id')
      .getRawAndEntities();
  
    return recipes.entities.map((recipe, index) => ({
      ...recipe,
      author: {
        user_id: recipe.author.user_id,
        username: recipe.author.username,
        first_name: recipe.author.first_name,
        last_name: recipe.author.last_name,
        image: recipe.author.image,
      },
      likes: recipe.likes || 0,
      averageRating: parseFloat(recipes.raw[index].recipe_averageRating),
    }));
  }
  

  async getRecipeById(recipeId: number): Promise<any> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.ratings', 'rating')
      .leftJoinAndSelect('recipe.stepsDetails', 'step')
      .leftJoin('recipe.likedRecipes', 'likedRecipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .loadRelationCountAndMap('recipe.likes', 'recipe.likedRecipes')
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'averageRating')
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .groupBy('recipe.recipe_id, author.user_id, rating.rating_id, step.step_id')
      .getRawAndEntities();
  
    if (!recipe.entities.length) {
      throw new NotFoundException(`recipe-not-found`);
    }
  
    const recipeEntity = recipe.entities[0];
    const raw = recipe.raw[0];
  
    return {
      ...recipeEntity,
      author: recipeEntity.author ? {
        user_id: recipeEntity.author.user_id,
        username: recipeEntity.author.username,
        first_name: recipeEntity.author.first_name,
        last_name: recipeEntity.author.last_name,
        image: recipeEntity.author.image,
      } : null,
      likes: recipeEntity.likes || 0,
      averageRating: parseFloat(raw.averageRating),
    };
  }

  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    const recipe = this.recipeRepository.create({
      author_id: user.sub,
      ...createRecipeDto,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await this.recipeRepository.save(recipe);
  }

  async updateRecipe(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    const recipe = await this.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('recipe-not-found');
    }
    if (recipe.author_id !== user.sub) {
      throw new UnauthorizedException();
    }

    await this.recipeRepository.update(id, {
      ...updateRecipeDto,
      updated_at: new Date(),
    });

    return await this.getRecipeById(id);
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
