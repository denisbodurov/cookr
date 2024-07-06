import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
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
      .leftJoin('recipe.ratings', 'rating')
      .leftJoin('recipe.likedRecipes', 'likedRecipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .loadRelationCountAndMap('recipe.likes', 'recipe.likedRecipes')
      .addSelect('AVG(rating.rating)', 'averageRating')
      .groupBy('recipe.recipe_id, author.user_id, rating.rating_id, likedRecipe.like_id')
      .getMany();

    return recipes.map(recipe => ({
      ...recipe,
      author: recipe.author ? {
        user_id: recipe.author.user_id,
        username: recipe.author.username,
        first_name: recipe.author.first_name,
        last_name: recipe.author.last_name,
        image: recipe.author.image,
      } : null,
      likes: recipe.likes || 0,
      averageRating: parseFloat(recipe.averageRating?.toString()) || 0,
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
      .where('recipe.recipe_id = :recipeId', { recipeId })
      .getOne();

    if (!recipe) {
      throw new NotFoundException(`recipe-not-found`);
    }

    return {
      ...recipe,
      author: recipe.author ? {
        user_id: recipe.author.user_id,
        username: recipe.author.username,
        first_name: recipe.author.first_name,
        last_name: recipe.author.last_name,
        image: recipe.author.image,
      } : null,
      likes: recipe.likes || 0,
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
