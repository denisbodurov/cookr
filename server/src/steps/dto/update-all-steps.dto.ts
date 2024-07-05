import { PartialType } from '@nestjs/swagger';
import { CreateStepDto } from './create-step.dto';
import { IsInt } from 'class-validator';

export class UpdateAllStepDto extends PartialType(CreateStepDto) {
    
  @IsInt()
  step_number: number;

}
