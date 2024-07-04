import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateStepDto {
  @IsInt()
  recipe_id: number;

  @IsInt()
  step_number: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
