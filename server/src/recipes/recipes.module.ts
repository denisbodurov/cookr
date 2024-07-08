import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeEntity } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeView } from './entities/multi-recipe-view.entity';
import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { StepEntity } from 'src/steps/entities/step.entity';
import { OneRecipeView } from './entities/recipe-view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      RecipeView,
      StepEntity,
      IngredientEntity,
      ProductEntity,
      OneRecipeView
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
