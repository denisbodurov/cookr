import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikedRecipesEntity } from './entities/liked_recipe.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Injectable()
export class LikedRecipesService {
  constructor(
    @InjectRepository(LikedRecipesEntity)
    private readonly likedRecipesRepository: Repository<LikedRecipesEntity>,
  ) {}

  async likeRecipe(
    userId: number,
    recipeId: number,
  ): Promise<LikedRecipesEntity> {

    const existingLike = await this.likedRecipesRepository.findOne({
      where: { user_id: userId, recipe_id: recipeId },
    });
    if (existingLike) {
      throw new BadRequestException('recipe-already-liked');
    }

    const newLike = this.likedRecipesRepository.create({
      user_id: userId,
      recipe_id: recipeId,
    });

    return await this.likedRecipesRepository.save(newLike);
  }

  async unlikeRecipe(userId: number, recipeId: number): Promise<void> {
    const like = await this.likedRecipesRepository.findOne({
      where: { user_id: userId, recipe_id: recipeId },
    });
    if (!like) {
      throw new BadRequestException('recipe-not-liked');
    }

    await this.likedRecipesRepository.delete(like.like_id);
  }

  async getLikedRecipesByUserId(userId: number): Promise<RecipeEntity[]> {
    const likedRecipes = await this.likedRecipesRepository.find({
      where: { user_id: userId },
      relations: ['recipe', 'recipe.author'],
    });

    return likedRecipes.map((likedRecipe) => likedRecipe.recipe);
  }
}
