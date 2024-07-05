import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepEntity } from './entities/step.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { TokenPayload } from 'src/auth/models/token.model';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(StepEntity)
    private stepsRepository: Repository<StepEntity>,
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
  ) {}

  async create(createStepDto: CreateStepDto, user: TokenPayload, recipe: RecipeEntity): Promise<StepEntity> {
    if (user.sub !== recipe.author_id) {
      throw new UnauthorizedException("Not author of the recipe. Can't edit the recipe steps!");
    }

    const stepCount = await this.stepsRepository.count({ where: { recipe } });
    const stepNumber = stepCount + 1;

    const step = this.stepsRepository.create({
      ...createStepDto,
      step_number: stepNumber,
      recipe,
    });

    return await this.stepsRepository.save(step);
  }

  async findAll(recipeId: number): Promise<StepEntity[]> {
    const recipe = await this.recipeRepository.findOne({ where: { recipe_id: recipeId } });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    return this.stepsRepository.find({
      where: { recipe },
      order: { step_number: 'ASC' },
    });
  }

  async findOneByStepNumber(step_number: number, recipe: RecipeEntity): Promise<StepEntity> {
    const step = await this.stepsRepository.findOne({
      where: { step_number, recipe },
    });

    if (!step) {
      throw new NotFoundException(`Step number ${step_number} not found in the given recipe`);
    }

    return step;
  }

  async update(step_number: number, updateStepDto: UpdateStepDto, user: TokenPayload, recipe: RecipeEntity): Promise<StepEntity> {
    if (user.sub !== recipe.author_id) {
      throw new UnauthorizedException("Not author of the recipe. Can't edit the recipe steps!");
    }

    const step = await this.findOneByStepNumber(step_number, recipe);

    await this.stepsRepository.update(step.step_id, updateStepDto);

    return this.findOneByStepNumber(step_number, recipe);
  }

  async removeByStepNumber(step_number: number, user: TokenPayload, recipe: RecipeEntity): Promise<void> {
    if (user.sub !== recipe.author_id) {
      throw new UnauthorizedException("Not author of the recipe. Can't edit the recipe steps!");
    }

    const step = await this.findOneByStepNumber(step_number, recipe);

    const result = await this.stepsRepository.delete(step.step_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Step number ${step_number} not found`);
    }

    // Adjust the step numbers of remaining steps
    const remainingSteps = await this.stepsRepository.find({ where: { recipe }, order: { step_number: 'ASC' } });
    for (let i = 0; i < remainingSteps.length; i++) {
      remainingSteps[i].step_number = i + 1;
      await this.stepsRepository.save(remainingSteps[i]);
    }
  }

  async removeAllSteps(recipe: RecipeEntity, user: TokenPayload): Promise<void> {
    if (user.sub !== recipe.author_id) {
      throw new UnauthorizedException("Not author of the recipe. Can't edit the recipe steps!");
    }

    await this.stepsRepository.delete({ recipe });
  }

  async updateAllSteps(updateStepsDto: UpdateStepDto[], user: TokenPayload, recipe: RecipeEntity): Promise<StepEntity[]> {
    if (user.sub !== recipe.author_id) {
      throw new UnauthorizedException("Not author of the recipe. Can't edit the recipe steps!");
    }

    const updatedSteps: StepEntity[] = [];
    for (const updateStepDto of updateStepsDto) {
      const step = await this.findOneByStepNumber(updateStepDto.step_number, recipe);
      await this.stepsRepository.update(step.step_id, updateStepDto);
      updatedSteps.push(await this.findOneByStepNumber(updateStepDto.step_number, recipe));
    }

    // Adjust the step numbers to ensure they are sequential
    const orderedSteps = await this.stepsRepository.find({ where: { recipe }, order: { step_number: 'ASC' } });
    for (let i = 0; i < orderedSteps.length; i++) {
      orderedSteps[i].step_number = i + 1;
      await this.stepsRepository.save(orderedSteps[i]);
    }

    return orderedSteps;
  }
}
