import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { TokenPayload } from 'src/auth/models/token.model';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingsRepository: Repository<RatingEntity>,
  ) {}

  async create(description: string, rating: number, user: TokenPayload, recipe: RecipeEntity): Promise<RatingEntity> {
    if (rating < 0 || rating > 5 || !Number.isInteger(rating)) {
      throw new BadRequestException('Rating must be an integer between 0 and 5');
    }

    const existingRating = await this.ratingsRepository.findOne({ where: { rater_id: user.sub, recipe } });
    if (existingRating) {
      throw new ConflictException('You have already rated this recipe');
    }

    if (recipe.author_id === user.sub) {
      throw new BadRequestException('You cannot rate your own recipe');
    }

    const newRating = this.ratingsRepository.create({ description, rating, rater_id: user.sub, recipe });
    return await this.ratingsRepository.save(newRating);
  }

  async remove(recipe: RecipeEntity, userId: number): Promise<void> {
    const rating = await this.ratingsRepository.findOne({ where: { recipe: recipe, rater_id: userId } });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    await this.ratingsRepository.remove(rating);
  }

  async findAllByRecipe(recipe: RecipeEntity): Promise<RatingEntity[]> {
    return await this.ratingsRepository.find({ where: { recipe }, relations: ['rater'] });
  }

  async update(updateRatingDto: UpdateRatingDto, recipe: RecipeEntity, userId: number): Promise<RatingEntity> {
    if (updateRatingDto.rating < 0 || updateRatingDto.rating > 5 || !Number.isInteger(updateRatingDto.rating) && updateRatingDto.rating != null) {
      throw new BadRequestException('Rating must be an integer between 0 and 5');
    }

    const existingRating = await this.ratingsRepository.findOne({ where: { recipe: recipe,  rater_id: userId } });
    if (!existingRating) {
      throw new NotFoundException('Rating not found');
    }
    if(updateRatingDto.description != null)
      existingRating.description = updateRatingDto.description;
    if(updateRatingDto.rating != null)
      existingRating.rating = updateRatingDto.rating;
    return await this.ratingsRepository.save(existingRating);
  }

  async getAverageRating(recipe: RecipeEntity): Promise<number> {
    const { avg } = await this.ratingsRepository
      .createQueryBuilder('rating')
      .select('AVG(rating)', 'avg')
      .where('rating.recipe.recipe_id = :recipeId', { recipeId: recipe.recipe_id })
      .getRawOne();
      
    return parseFloat(avg);
  }
}
