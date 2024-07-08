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
  Put,
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
import { RecipeView } from './entities/multi-recipe-view.entity';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
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
    return await this.recipesService.getRecipeById(id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllRecipes(): Promise<RecipeView[]> {
    return this.recipesService.getAllRecipes();
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

}
