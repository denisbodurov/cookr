import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikedRecipesEntity } from './entities/liked_recipe.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Injectable()
export class LikedRecipesService {
  recipeRepository: any;
  constructor(
    @InjectRepository(LikedRecipesEntity)
    private readonly likedRecipesRepository: Repository<LikedRecipesEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipesRepository: Repository<LikedRecipesEntity>,
  ) {}

  async likeRecipe(userId: number, recipeId: number) {
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

  async unlikeRecipe(userId: number, recipeId: number) {
    const like = await this.likedRecipesRepository.findOne({
      where: { user_id: userId, recipe_id: recipeId },
    });
    if (!like) {
      throw new BadRequestException('recipe-not-liked');
    }

    await this.likedRecipesRepository.delete(like.like_id);
  }

  async getLikedRecipesByUserId(userId: number) {
    const recipes = await this.recipesRepository
      .createQueryBuilder('recipe')
      .leftJoin('recipe.ratings', 'rating')
      .select(['recipe.recipe_id', 'recipe.name', 'recipe.image'])
      .leftJoin('recipe.author', 'author')
      .addSelect([
        'author.username',
        'author.first_name',
        'author.last_name',
        'author.image',
      ])
      .addSelect('COALESCE(AVG(rating.rating), 0)', 'averageRating')
      .addSelect('TRUE', 'recipe_saved')
      .innerJoin('recipe.likedRecipes', 'likedRecipe', 'likedRecipe.user_id = :userId')
      .setParameter('userId', userId)
      .groupBy('recipe.recipe_id, author.user_id')
      .getRawAndEntities();

    if (!recipes.entities.length) {
      throw new NotFoundException(`No liked recipes found for user with ID ${userId}`);
    }

    return recipes.entities.map((recipeEntity, index) => {
      const raw = recipes.raw[index];
      return {
        ...recipeEntity,
        averageRating: parseFloat(raw.averageRating),
        recipe_saved: true
      };
    });
}

}
