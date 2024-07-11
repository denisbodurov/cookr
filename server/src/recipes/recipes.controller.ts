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
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/decorators/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model';
import { QueryDto } from './dto/query.dto';
import { QueryProductDto } from './dto/query-products.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @User() user: TokenPayload,
  ) {
    return this.recipesService.createRecipe(createRecipeDto, user);
  }

  @Get(':recipeId')
  async getRecipeById(@Param('recipeId', ParseIntPipe) recipeId: number) {
    return this.recipesService.getRecipeById(recipeId);
  }

  @Get()
  async getAllRecipes(@Query() query: QueryDto) {
    return this.recipesService.getAllRecipes(query);
  }

  @Patch(':recipeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateRecipe(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @User() user: TokenPayload,
  ) {
    return this.recipesService.updateRecipe(recipeId, updateRecipeDto, user);
  }

  @Delete(':recipeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteRecipe(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @User() user: TokenPayload,
  ) {
    return this.recipesService.deleteRecipe(recipeId, user);
  }

  // @Get('/nutritions/:recipe_id')
  // async getRecipeNutritionalInfo(@Param('recipe_id', ParseIntPipe) recipeId: number){
  //   return this.recipesService.getRecipeNutritionalInfo(recipeId);
  // }

  @Get('/recipe/types')
  getRecipeTypes() {
    return this.recipesService.getRecipeTypes();
  }

  @Get('/search/by/products')
  async getRecipesByProducts(@Query() query: QueryProductDto) {
    if (typeof query.productNames === 'string') {
      query.productNames = [query.productNames];
    }

    return this.recipesService.getRecipesByProducts(query);
  }
}
