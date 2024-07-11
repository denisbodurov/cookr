import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LikedRecipesService } from './liked_recipes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecipesService } from 'src/recipes/recipes.service';

@ApiTags('liked-recipes')
@Controller('liked-recipes')
export class LikedRecipesController {
  constructor(
    private readonly likedRecipesService: LikedRecipesService,
    private readonly recipesService: RecipesService,
  ) {}

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async getLikedRecipesByUserId(@User() user: TokenPayload,) {
    return this.likedRecipesService.getLikedRecipesByUserId(user.sub);
  }

  @Post(':recipeId/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async likeRecipe(
    @Param('recipeId') recipeId: number,
    @User() user: TokenPayload,
  ) {
    await this.recipesService.getSimpleRecipeById(recipeId);
    return this.likedRecipesService.likeRecipe(user.sub, recipeId);
  }

  @Delete(':recipeId/unlike')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async unlikeRecipe(
    @Param('recipeId') recipeId: number,
    @User() user: TokenPayload,
  ) {
    await this.recipesService.getSimpleRecipeById(recipeId);
    return this.likedRecipesService.unlikeRecipe(user.sub, recipeId);
  }
}
