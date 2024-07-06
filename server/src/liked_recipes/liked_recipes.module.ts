import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedRecipesService } from './liked_recipes.service';
import { LikedRecipesController } from './liked_recipes.controller';
import { LikedRecipesEntity } from './entities/liked_recipe.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikedRecipesEntity, UserEntity, RecipeEntity]),
  ],
  controllers: [LikedRecipesController],
  providers: [LikedRecipesService],
})
export class LikedRecipesModule {}
