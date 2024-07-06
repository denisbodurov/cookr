import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedRecipesService } from './liked_recipes.service';
import { LikedRecipesController } from './liked_recipes.controller';
import { LikedRecipesEntity } from './entities/liked_recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikedRecipesEntity])],
  controllers: [LikedRecipesController],
  providers: [LikedRecipesService],
  exports: [LikedRecipesService],
})
export class LikedRecipesModule {}
