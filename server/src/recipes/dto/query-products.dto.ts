import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product name must be provided' })
  @IsString({ each: true })
  productNames: string[];
}
