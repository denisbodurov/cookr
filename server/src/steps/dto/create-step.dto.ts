import { IsInt, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  description: string;

  @IsInt()
  step_number: number;
}
