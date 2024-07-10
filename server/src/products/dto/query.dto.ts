import { ProductType } from "src/products/enums/products.enum";

export class QueryRecipeDto {
    product_name?: string;
    product_type?: ProductType;
}