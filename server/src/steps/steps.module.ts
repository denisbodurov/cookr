import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepsService } from './steps.service';
import { StepsController } from './steps.controller';
import { StepEntity } from './entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntity])],
  controllers: [StepsController],
  providers: [StepsService],
  exports: [StepsService],
})
export class StepsModule {}
