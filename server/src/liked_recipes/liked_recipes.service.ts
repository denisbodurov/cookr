import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikedRecipesEntity } from './entities/liked_recipe.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class LikedRecipesService {
  constructor(
    @InjectRepository(LikedRecipesEntity)
    private likedRecipesRepository: Repository<LikedRecipesEntity>,
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(recipeId: number, userId: number): Promise<LikedRecipesEntity> {
    const recipe = await this.recipeRepository.findOne({ where: { recipe_id: recipeId } });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    if (recipe.author_id === userId) {
      throw new BadRequestException('You cannot like your own recipe');
    }

    const user = await this.userRepository.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const likedRecipe = this.likedRecipesRepository.create({
      recipe,
      user,
    });

    return await this.likedRecipesRepository.save(likedRecipe);
  }

  async findAll(): Promise<LikedRecipesEntity[]> {
    return await this.likedRecipesRepository.find({ relations: ['recipe', 'user'] });
  }

  async findOne(id: number): Promise<LikedRecipesEntity> {
    const likedRecipe = await this.likedRecipesRepository.findOne({ where: { like_id: id }, relations: ['recipe', 'user'] });
    if (!likedRecipe) {
      throw new NotFoundException(`Liked Recipe with ID ${id} not found`);
    }
    return likedRecipe;
  }

  async remove(recipeId: number, userId: number): Promise<void> {
    const likedRecipe = await this.likedRecipesRepository.findOne({ where: { recipe: { recipe_id: recipeId }, user: { user_id: userId } } });
    if (!likedRecipe) {
      throw new NotFoundException(`Liked Recipe for Recipe ID ${recipeId} and User ID ${userId} not found`);
    }

    await this.likedRecipesRepository.delete(likedRecipe.like_id);
  }

  async countLikes(recipeId: number): Promise<number> {
    const recipe = await this.recipeRepository.findOne({ where: { recipe_id: recipeId } });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }
    return await this.likedRecipesRepository.count({ where: { recipe } });
  }
}
