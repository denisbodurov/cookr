import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
