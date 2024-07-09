import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Patch} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipesService } from 'src/recipes/recipes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { TokenPayload } from 'src/auth/models/token.model';
import { User } from 'src/users/decorators/user.decorator';

@ApiTags('ratings')
@Controller('ratings/:recipeId')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly recipesService: RecipesService,
  ) {}

  @Post('rate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createRating(
    @Param('recipeId') recipeId: number,
    @Body() createRatingDto: CreateRatingDto,
    @User() user: TokenPayload,
  ) {
    const recipe = await this.recipesService.getSimpleRecipeById(recipeId);
    return this.ratingsService.createRating(createRatingDto, user, recipe);
  }

  @Get()
  async findAll(@Param('recipeId') recipeId: number) {
    const recipe = await this.recipesService.getSimpleRecipeById(recipeId);
    return this.ratingsService.getRatingsByRecipe(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-rating/:ratingId')
  @ApiBearerAuth()
  async removeRating(
    @Param('recipeId') recipeId: number,
    @Param('ratingId') ratingId: number,
    @User() user: TokenPayload,
  ) {
    await this.ratingsService.removeRating(ratingId, user);
  }

  @Patch('update-rating/:ratingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateRating(
    @Param('ratingId') ratingId: number,
    @Body() updateRatingDto: UpdateRatingDto,
    @User() user: TokenPayload,
  ) {
    return this.ratingsService.updateRating(ratingId, updateRatingDto, user);
  }

}
