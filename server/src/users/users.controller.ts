import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RecipesService } from 'src/recipes/recipes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly recipeService: RecipesService,
    private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Get(':id/recipes')
  getUserRecipes(@Param('id') id: number) {
    return this.recipeService.getRecipiesByUserId(id);
  }
}
