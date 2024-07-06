import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { ApiTags } from '@nestjs/swagger';
import { LikedRecipesService } from 'src/liked_recipes/liked_recipes.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly recipeService: RecipesService,
    private readonly likedRecipesService: LikedRecipesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/recipes')
  getUserRecipes(@Param('id') id: number) {
    return this.recipeService.getRecipesByUserId(id);
  }

  @Get(':id/liked-recipes')
  getUserLikedRecipes(@Param('id') id: number) {
    return this.likedRecipesService.getLikedRecipesByUserId(id);
  }
}
