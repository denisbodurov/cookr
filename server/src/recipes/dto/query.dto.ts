import { ProductType } from "src/products/enums/products.enum";
import { RecipeType } from "../enums/recipe.enum";

export class QueryDto {
    name?: string;
    recipeType?: RecipeType;
    productType?: ProductType;
}