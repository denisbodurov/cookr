import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { TokenPayload } from 'src/auth/models/token.model';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingsRepository: Repository<RatingEntity>,
  ) {}

  async create(description: string, rating: number, user: TokenPayload, recipe: RecipeEntity): Promise<RatingEntity> {
    const existingRating = await this.ratingsRepository.findOne({ where: { rater_id: user.sub, recipe } });
    if (existingRating) {
      throw new ConflictException('You have already rated this recipe');
    }

    const newRating = this.ratingsRepository.create({ description, rating, rater_id: user.sub, recipe });
    return await this.ratingsRepository.save(newRating);
  }

  async remove(ratingId: number, user: TokenPayload): Promise<void> {
    const rating = await this.ratingsRepository.findOne({ where: { rating_id: ratingId, rater_id: user.sub } });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    await this.ratingsRepository.remove(rating);
  }

  async findAllByRecipe(recipe: RecipeEntity): Promise<RatingEntity[]> {
    return await this.ratingsRepository.find({ where: { recipe }, relations: ['rater'] });
  }

  async update(ratingId: number, description: string, rating: number, user: TokenPayload): Promise<RatingEntity> {
    const existingRating = await this.ratingsRepository.findOne({ where: { rating_id: ratingId, rater_id: user.sub } });
    if (!existingRating) {
      throw new NotFoundException('Rating not found');
    }

    existingRating.description = description;
    existingRating.rating = rating;
    return await this.ratingsRepository.save(existingRating);
  }

  async getAverageRating(recipe: RecipeEntity): Promise<number> {
    const { avg } = await this.ratingsRepository
      .createQueryBuilder('rating')
      .select('AVG(rating)', 'avg')
      .where('rating.recipeId = :recipeId', { recipeId: recipe.recipe_id })
      .getRawOne();
      
    return parseFloat(avg);
  }
}
