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
  percent_carbs: number;

  @IsInt()
  @Min(0)
  percent_fats: number;

  @IsInt()
  @Min(0)
  percent_protein: number;

  @IsInt()
  @Min(0)
  calories: number;

  @IsEnum(ProductType)
  product_type: ProductType;
}
