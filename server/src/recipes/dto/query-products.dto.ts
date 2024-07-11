import { IsString } from 'class-validator';

export class QueryProductDto {
  @IsString({ each: true })
  productNames: string[];
}
