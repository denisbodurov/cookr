import { Injectable } from '@nestjs/common';
import { CreateLikedRecipeDto } from './dto/create-liked_recipe.dto';
import { UpdateLikedRecipeDto } from './dto/update-liked_recipe.dto';

@Injectable()
export class LikedRecipesService {
  create(createLikedRecipeDto: CreateLikedRecipeDto) {
    return 'This action adds a new likedRecipe';
  }

  findAll() {
    return `This action returns all likedRecipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likedRecipe`;
  }

  update(id: number, updateLikedRecipeDto: UpdateLikedRecipeDto) {
    return `This action updates a #${id} likedRecipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} likedRecipe`;
  }
}
