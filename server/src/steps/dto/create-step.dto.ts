import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  step_number: number;
}
