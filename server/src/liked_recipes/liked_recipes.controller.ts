import { Controller, Post, Delete, Param, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LikedRecipesService } from './liked_recipes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model'; // Assuming this is where TokenPayload is defined
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('liked-recipes')
@Controller('liked-recipes')
export class LikedRecipesController {
  constructor(private readonly likedRecipesService: LikedRecipesService) {}

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async getLikedRecipesByUserId(@Param('userId') userId: number) {
    return this.likedRecipesService.getLikedRecipesByUserId(userId);
  }

  @Post(':recipeId/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async likerecipe(@Param('recipeId') recipeId: number, @User() user: TokenPayload) {
    return this.likedRecipesService.likeRecipe(user.sub, recipeId);
  }

  @Delete(':recipeId/unlike')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async unlikeRecipe(@Param('recipeId') recipeId: number, @User() user: TokenPayload) {
    return this.likedRecipesService.unlikeRecipe(user.sub, recipeId);
  }
  
}
