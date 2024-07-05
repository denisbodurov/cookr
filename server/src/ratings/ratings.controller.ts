import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipesService } from 'src/recipes/recipes.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from './dto/create-rating.dto';

@ApiTags('ratings')
@Controller('recipes/:recipeId/ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly recipesService: RecipesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('recipeId') recipeId: number,
    @Body() createRatingDto: CreateRatingDto,
    @Request() req
  ) {
    const recipe = await this.recipesService.getRecipeById(recipeId);
    return this.ratingsService.create(createRatingDto.description, createRatingDto.rating, req.user, recipe);
  }

  @Get()
  async findAll(@Param('recipeId') recipeId: number) {
    const recipe = await this.recipesService.getRecipeById(recipeId);
    return this.ratingsService.findAllByRecipe(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':ratingId')
  async remove(@Param('recipeId') recipeId: number, @Param('ratingId') ratingId: number, @Request() req) {
    await this.ratingsService.remove(ratingId, req.user);
    return { message: 'Rating deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':ratingId')
  async update(
    @Param('recipeId') recipeId: number,
    @Param('ratingId') ratingId: number,
    @Body('description') description: string,
    @Body('rating') rating: number,
    @Request() req
  ) {
    return this.ratingsService.update(ratingId, description, rating, req.user);
  }

  @Get('/average')
  async getAverageRating(@Param('recipeId') recipeId: number) {
    const recipe = await this.recipesService.getRecipeById(recipeId);
    return { averageRating: await this.ratingsService.getAverageRating(recipe) };
  }
}
