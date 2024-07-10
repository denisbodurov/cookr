import { IsOptional, IsString } from 'class-validator';
import { RecipeType } from 'src/recipes/entities/recipe-type.entity';
import { ProductType } from 'src/products/entities/product_type.entity';

export class QueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  recipe_type_name?: string;

  @IsOptional()
  @IsString()
  product_type_name?: string;
}
