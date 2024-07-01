import { Post, Body } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';

export class RecipeController{
    @Post('recipe')
    async create(@Body('recipe') recipeData: CreateRecipeDto) {
        return this.create(recipeData);
    }
    
}