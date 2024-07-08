import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductCategory, ProductType } from "../enums/products.enum";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    image: string = '';

    @IsEnum(ProductType)
    product_type: ProductType;

    @IsEnum(ProductCategory)
    product_category: ProductCategory;
}
