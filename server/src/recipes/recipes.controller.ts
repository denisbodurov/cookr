import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Get()
  async findAll(): Promise<RecipeEntity[]> {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RecipeEntity> {
    return this.recipeService.findOne(id);
  }

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
    return this.recipeService.create(createRecipeDto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity> {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.recipeService.delete(id);
  }
}
