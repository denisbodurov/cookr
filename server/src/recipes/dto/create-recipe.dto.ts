import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RecipeType } from '../enums/recipe.enum';

export class CreateRecipeDto {
  @IsNotEmpty({ message: 'name-cannot-be-blank'})
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty({ message: 'recipe_type-cannot-be-blank'})
  recipe_type: RecipeType;
}
