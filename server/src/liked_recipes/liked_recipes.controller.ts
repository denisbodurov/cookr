import { Controller, Post, Delete, Param, UseGuards, Get } from '@nestjs/common';
import { LikedRecipesService } from './liked_recipes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model'; // Assuming this is where TokenPayload is defined
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('liked-recipes')
@Controller('liked-recipes')
export class LikedRecipesController {
  constructor(private readonly likedRecipesService: LikedRecipesService) {}

  // @Get('recipe/:recipeId')
  // async getAllLikesForRecipe(@Param('recipeId') recipeId: number) {
  //   return this.likedRecipesService.findAllLikesForRecipe(recipeId);
  // }

  // @Get('user')
  // @UseGuards(JwtAuthGuard)
  // async getUserLikedRecipes(@User() user: TokenPayload) {
  //   return this.likedRecipesService.getLikedRecipesByUserId(user.sub);
  // }
}
