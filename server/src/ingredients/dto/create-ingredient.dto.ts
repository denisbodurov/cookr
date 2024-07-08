import { IsNumber, IsString } from "class-validator";

export class CreateIngredientDto {
    @IsNumber()
    product_id: number;

    @IsNumber()
    quantity: number;

    @IsString()
    unit: string;
}
