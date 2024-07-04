import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepEntity } from './entities/step.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(StepEntity)
    private stepsRepository: Repository<StepEntity>,
  ) {}

  async create(createStepDto: CreateStepDto): Promise<StepEntity> {
    const step = this.stepsRepository.create(createStepDto);
    return this.stepsRepository.save(step);
  }

  async findAll(): Promise<StepEntity[]> {
    return this.stepsRepository.find();
  }

  async findOne(id: number): Promise<StepEntity> {
    const step = await this.stepsRepository.findOne({
      where: { step_id: id },
    });
    if (!step) {
      throw new NotFoundException(`Step with ID ${id} not found`);
    }
    return step;
  }

  async update(id: number, updateStepDto: UpdateStepDto): Promise<StepEntity> {
    await this.stepsRepository.update(id, updateStepDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.stepsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Step with ID ${id} not found`);
    }
  }
}
