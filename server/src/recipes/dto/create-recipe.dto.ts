import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RecipeType } from '../enums/recipe.enum';
import { StepEntity } from 'src/steps/entities/step.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

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
  stepDetails: StepEntity[];

  @IsNotEmpty({ message: 'products-cannot-be-empty'})
  products: ProductEntity[];
}
