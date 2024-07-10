import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsOptional()
  @IsString()
  image: string = '';

  @IsInt()
  @IsNotEmpty()
  unit_id: number;

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

  @IsInt()
  @IsNotEmpty()
  product_type_id: number;
}
