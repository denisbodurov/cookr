import { ProductType } from "../entities/product_type.entity";

export class QueryRecipeDto {
    product_name?: string;
    product_type?: ProductType;
}