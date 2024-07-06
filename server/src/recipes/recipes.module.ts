import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeEntity } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedRecipesModule } from 'src/liked_recipes/liked_recipes.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity]), LikedRecipesModule],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
