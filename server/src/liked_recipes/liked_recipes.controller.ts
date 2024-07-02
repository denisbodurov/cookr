import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikedRecipesService } from './liked_recipes.service';
import { CreateLikedRecipeDto } from './dto/create-liked_recipe.dto';
import { UpdateLikedRecipeDto } from './dto/update-liked_recipe.dto';

@Controller('liked-recipes')
export class LikedRecipesController {
  constructor(private readonly likedRecipesService: LikedRecipesService) {}

  @Post()
  create(@Body() createLikedRecipeDto: CreateLikedRecipeDto) {
    return this.likedRecipesService.create(createLikedRecipeDto);
  }

  @Get()
  findAll() {
    return this.likedRecipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likedRecipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikedRecipeDto: UpdateLikedRecipeDto) {
    return this.likedRecipesService.update(+id, updateLikedRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likedRecipesService.remove(+id);
  }
}
