import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty({ message: 'author_id-cannot-be-blank'})
  author_id: number;

  @IsNotEmpty({ message: 'name-cannot-be-blank'})
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;
}
