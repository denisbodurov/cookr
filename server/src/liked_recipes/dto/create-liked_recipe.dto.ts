import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLikedRecipeDto {
  @IsInt()
  @IsNotEmpty()
  recipe_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
