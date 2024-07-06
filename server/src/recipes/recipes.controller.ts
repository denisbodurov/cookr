import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model';
import { LikedRecipesService } from 'src/liked_recipes/liked_recipes.service';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly likedRecipesService: LikedRecipesService,
    private readonly recipesService: RecipesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @User() user: TokenPayload,
  ): Promise<RecipeEntity> {
    return this.recipesService.createRecipe(createRecipeDto, user);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getRecipeById(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipesService.getRecipeById(id);
    const likes = await this.likedRecipesService.getLikesByRecipeId(id);
    return { ...recipe, likes: likes.length };
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllRecipes() {
    const recipes = await this.recipesService.getAllRecipes();
    return await Promise.all(recipes.map(async (recipe) => {
      const likes = await this.likedRecipesService.getLikesByRecipeId(recipe.recipe_id);
      return {
        ...recipe,
        likes: likes.length,
      };
    }));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @User() user: TokenPayload,
  ): Promise<RecipeEntity> {
    return this.recipesService.updateRecipe(id, updateRecipeDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteRecipe(
    @Param('id', ParseIntPipe) id: number,
    @User() user: TokenPayload,
  ): Promise<void> {
    return this.recipesService.deleteRecipe(id, user);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async likeRecipe(
    @Param('id', ParseIntPipe) id: number,
    @User() user: TokenPayload,
  ) {
    await this.recipesService.getRecipeById(id);
    return this.likedRecipesService.likeRecipe(user.sub, id);
  }

  @Post(':id/unlike')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async unlikeRecipe(
    @Param('id', ParseIntPipe) id: number,
    @User() user: TokenPayload,
  ) {
    await this.recipesService.getRecipeById(id);
    console.log('THE ID IS: ' + user.sub);
    return this.likedRecipesService.unlikeRecipe(user.sub, id);
  }
}
