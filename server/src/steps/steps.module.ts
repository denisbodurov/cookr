import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepsService } from './steps.service';
import { StepsController } from './steps.controller';
import { StepEntity } from './entities/step.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { RecipesController } from 'src/recipes/recipes.controller';
import { RecipesService } from 'src/recipes/recipes.service';
import { LikedRecipesModule } from 'src/liked_recipes/liked_recipes.module';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntity, RecipeEntity]), LikedRecipesModule],
  controllers: [StepsController, RecipesController],
  providers: [StepsService, RecipesService],
  exports: [StepsService, RecipesService],
})
export class StepsModule {}
