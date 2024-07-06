import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Patch} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipesService } from 'src/recipes/recipes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from './dto/create-rating.dto';
import { User } from 'src/users/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model';
import { UpdateRatingDto } from './dto/update-rating.dto';

@ApiTags('ratings')
@Controller('recipes/:recipeId/ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly recipesService: RecipesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Param('recipeId') recipeId: number,
    @Body() createRatingDto: CreateRatingDto,
    @User() user: TokenPayload,
  ) {
    const recipe = await this.recipesService.getRecipeById(recipeId);
    return this.ratingsService.create(createRatingDto.description, createRatingDto.rating, user, recipe);
  }

  @Get()
  async findAll(@Param('recipeId') recipeId: number) {
    const recipe = await this.recipesService.getRecipeById(recipeId);
    return this.ratingsService.findAllByRecipe(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  async remove(@Param('recipeId') recipeId: number, @User() user: TokenPayload,) {
    const recipe = await this.recipesService.getRecipeById(recipeId);
    await this.ratingsService.remove(recipe, user.sub);
    return { message: 'Rating deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch()
  async update(
    @Param('recipeId') recipeId: number,
    @Body() updateRatingDto: UpdateRatingDto,
    @User() user: TokenPayload,
  ) {
    const recipe = await this.recipesService.getRecipeById(recipeId);
    return this.ratingsService.update(updateRatingDto, recipe, user.sub);
  }

  @Get('/average')
  async getAverageRating(@Param('recipeId') recipe_id: number) {
    const recipe = await this.recipesService.getRecipeById(recipe_id);
    return { averageRating: await this.ratingsService.getAverageRating(recipe) };
  }
}
