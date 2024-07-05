import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingEntity } from './entities/rating.entity';
import { RecipesModule } from 'src/recipes/recipes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity]), RecipesModule, UsersModule],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
