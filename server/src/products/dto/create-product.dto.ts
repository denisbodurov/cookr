import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Units, ProductType } from "../enums/products.enum";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    product_name: string;

  @IsOptional()
  @IsString()
  image: string = '';

  @IsEnum(Units)
  unit: Units;

  @IsInt()
  @Min(0)
  carbs: number;

  @IsInt()
  @Min(0)
  fats: number;

  @IsInt()
  @Min(0)
  protein: number;

  @IsInt()
  @Min(0)
  calories: number;

  @IsEnum(ProductType)
  product_type: ProductType;
}
