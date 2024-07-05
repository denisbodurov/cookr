import { CreateRecipeDto } from "./create-recipe.dto";
import { OmitType } from "@nestjs/swagger";

export class UpdateRecipeDto extends OmitType(CreateRecipeDto, ['author_id']){}