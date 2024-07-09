import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { ApiTags } from '@nestjs/swagger';
import { LikedRecipesService } from 'src/liked_recipes/liked_recipes.service';
import { TokenPayload } from 'src/auth/models/token.model';
import { User } from './decorators/user.decorator';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
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

  @Get(':userId')
  getOne(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Get(':userId/recipes')
  getUserRecipes(@Param('userId') userId: number) {
    return this.recipeService.getRecipesByUserId(userId);
  }

  @Get(':userId/liked-recipes')
  getUserLikedRecipes(@Param('userId') userId: number) {
    return this.likedRecipesService.getLikedRecipesByUserId(userId);
  }
}
