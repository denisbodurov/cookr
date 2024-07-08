import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { RecipeType } from '../enums/recipe.enum';
import { StepEntity } from 'src/steps/entities/step.entity';
import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { Type } from 'class-transformer';
import { CreateStepDto } from 'src/steps/dto/create-step.dto';
import { CreateIngredientDto } from 'src/ingredients/dto/create-ingredient.dto';

export class CreateRecipeDto {
  @IsNotEmpty({ message: 'name-cannot-be-blank'})
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty({ message: 'recipe_type-cannot-be-blank'})
  @IsEnum(RecipeType, { message: 'recipe_type-must-be-enum-value'})
  recipe_type: RecipeType;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'ingredients-cannot-be-blank'})
  @Type(() => CreateStepDto)
  stepsDetails: CreateStepDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'ingredients-cannot-be-blank'})
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];
}
