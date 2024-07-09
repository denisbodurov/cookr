import { IsNumber } from "class-validator";

export class CreateIngredientDto {
    @IsNumber()
    product_id: number;

    @IsNumber()
    quantity: number;
}
