import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { TokenPayload } from 'src/auth/models/token.model';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingsRepository: Repository<RatingEntity>,
  ) {}

  async createRating(
    createRatingDto: CreateRatingDto,
    user: TokenPayload,
    recipe: RecipeEntity,
  ): Promise<RatingEntity> {
    const existingRating = await this.ratingsRepository.findOne({
      where: { rater_id: user.sub, rated_id: recipe.recipe_id },
    });

    if (existingRating) {
      throw new BadRequestException('recipe-already-rated');
    }

    const newRating = this.ratingsRepository.create({
      ...createRatingDto,
      rater_id: user.sub,
      rated_id: recipe.recipe_id,
    });

    return await this.ratingsRepository.save(newRating);
  }

  async removeRating(ratingId: number, user: TokenPayload): Promise<void> {
    const rating = await this.ratingsRepository.findOne({
      where: { rating_id: ratingId, rater_id: user.sub },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    await this.ratingsRepository.remove(rating);
  }

  async getRatingsByRecipe(recipe: RecipeEntity): Promise<RatingEntity[]> {
    return await this.ratingsRepository.find({
      where: { rated_id: recipe.recipe_id },
      relations: ['rater'],
    });
  }

  async updateRating(
    ratingId: number,
    updateRatingDto: UpdateRatingDto,
    user: TokenPayload,
  ): Promise<RatingEntity> {
    const existingRating = await this.ratingsRepository.findOne({
      where: { rating_id: ratingId, rater_id: user.sub },
    });

    if (!existingRating) {
      throw new NotFoundException('rating-not-found');
    }

    Object.assign(existingRating, updateRatingDto);

    return await this.ratingsRepository.save(existingRating);
  }

  async getAverageRating(recipe: RecipeEntity): Promise<number> {
    const { avg } = await this.ratingsRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.rating)', 'avg')
      .where('rating.rated_id = :recipeId', { recipeId: recipe.recipe_id })
      .getRawOne();

    return parseFloat(avg);
  }
}
