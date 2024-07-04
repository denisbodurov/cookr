import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  steps: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  author_id: number;
}