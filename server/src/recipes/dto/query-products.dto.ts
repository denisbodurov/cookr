import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsString({ each: true })
  productNames: string[];
}
