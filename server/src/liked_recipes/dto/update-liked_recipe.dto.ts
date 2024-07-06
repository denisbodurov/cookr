import { IsInt, IsOptional } from 'class-validator';

export class UpdateLikedRecipeDto {
  @IsInt()
  @IsOptional()
  recipe_id?: number;

  @IsInt()
  @IsOptional()
  user_id?: number;
}
