import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateRecipeDto } from "./create-recipe.dto";

export class UpdateRecipeDto extends OmitType(CreateRecipeDto, ['author_id'] as const){}