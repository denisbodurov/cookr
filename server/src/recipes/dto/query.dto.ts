import { IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  recipe_type_name?: string;
}
