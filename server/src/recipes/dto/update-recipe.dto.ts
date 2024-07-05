import { CreateRecipeDto } from "./create-recipe.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateRecipeDto extends PartialType(CreateRecipeDto){}