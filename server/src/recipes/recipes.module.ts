import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeEntity } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { StepEntity } from 'src/steps/entities/step.entity';
import { RecipeType } from './entities/recipe-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      StepEntity,
      IngredientEntity,
      ProductEntity,
      RecipeType
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
