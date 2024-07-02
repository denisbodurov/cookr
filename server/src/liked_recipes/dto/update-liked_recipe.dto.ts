import { PartialType } from '@nestjs/mapped-types';
import { CreateLikedRecipeDto } from './create-liked_recipe.dto';

export class UpdateLikedRecipeDto extends PartialType(CreateLikedRecipeDto) {}
