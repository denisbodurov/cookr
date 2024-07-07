import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RecipeType } from '../enums/recipe.enum';
import { StepEntity } from 'src/steps/entities/step.entity';
import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { Type } from 'class-transformer';
import { CreateStepDto } from 'src/steps/dto/create-step.dto';

export class CreateRecipeDto {
  @IsNotEmpty({ message: 'name-cannot-be-blank'})
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty({ message: 'recipe_type-cannot-be-blank'})
  recipe_type: RecipeType;

  @IsNotEmpty({ message: 'steps-details-cannot-be-blank'})
  stepDetails: CreateStepDto[];

  @IsNotEmpty({ message: 'products-cannot-be-empty'})
  ingredients: IngredientEntity[];
}
