import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
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

  @IsNotEmpty({ message: 'recipe_type_name-cannot-be-blank'})
  @IsString()
  recipe_type_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'stepsDetails-cannot-be-blank'})
  @Type(() => CreateStepDto)
  stepsDetails: CreateStepDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'ingredients-cannot-be-blank'})
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];
}
