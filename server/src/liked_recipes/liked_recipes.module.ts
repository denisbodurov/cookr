import { Module } from '@nestjs/common';
import { LikedRecipesService } from './liked_recipes.service';
import { LikedRecipesController } from './liked_recipes.controller';

@Module({
  controllers: [LikedRecipesController],
  providers: [LikedRecipesService],
})
export class LikedRecipesModule {}
