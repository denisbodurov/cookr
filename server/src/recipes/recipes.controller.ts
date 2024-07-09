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
import { User } from 'src/users/decorators/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model';

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

  @Get(':recipeId')
  @ApiBearerAuth()
  async getRecipeById(@Param('recipeId', ParseIntPipe) recipeId: number){
    return await this.recipesService.getRecipeById(recipeId);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllRecipes(@User() user: TokenPayload) {
    return this.recipesService.getAllRecipes(user);
  }

  @Patch(':recipeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateRecipe(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @User() user: TokenPayload,
  ): Promise<RecipeEntity> {
    return this.recipesService.updateRecipe(recipeId, updateRecipeDto, user);
  }

  @Delete(':recipeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteRecipe(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @User() user: TokenPayload,
  ): Promise<void> {
    return this.recipesService.deleteRecipe(recipeId, user);
  }

}
