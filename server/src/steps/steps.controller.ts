import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { StepEntity } from './entities/step.entity';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  async create(@Body() createStepDto: CreateStepDto): Promise<StepEntity> {
    return this.stepsService.create(createStepDto);
  }

  @Get()
  async findAll(): Promise<StepEntity[]> {
    return this.stepsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StepEntity> {
    return this.stepsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto): Promise<StepEntity> {
    return this.stepsService.update(+id, updateStepDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.stepsService.remove(+id);
  }
}
