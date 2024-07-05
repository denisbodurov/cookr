import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipesService } from 'src/recipes/recipes.service';

@Controller('recipes/:recipeId/steps')
export class StepsController {
  constructor(
    private readonly stepsService: StepsService,
    private readonly recipeService: RecipesService,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('recipeId') recipeId: number,
    @Body() createStepDto: CreateStepDto,
    @Request() req
  ) {
    const recipe = await this.recipeService.getRecipeById(recipeId);
    return this.stepsService.create(createStepDto, req.user, recipe);
  }

  @Get()
  async findAll(@Param('recipeId') recipeId: number) {
    return this.stepsService.findAll(recipeId);
  }

  @Get(':stepNumber')
  async findOne(
    @Param('recipeId') recipeId: number,
    @Param('stepNumber') stepNumber: number
  ) {
    const recipe = await this.recipeService.getRecipeById(recipeId);
    return this.stepsService.findOneByStepNumber(stepNumber, recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':stepNumber')
  async update(
    @Param('recipeId') recipeId: number,
    @Param('stepNumber') stepNumber: number,
    @Body() updateStepDto: UpdateStepDto,
    @Request() req
  ) {
    const recipe = await this.recipeService.getRecipeById(recipeId);
    return this.stepsService.update(stepNumber, updateStepDto, req.user, recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':stepNumber')
  async remove(
    @Param('recipeId') recipeId: number,
    @Param('stepNumber') stepNumber: number,
    @Request() req
  ) {
    const recipe = await this.recipeService.getRecipeById(recipeId);
    return this.stepsService.removeByStepNumber(stepNumber, req.user, recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeAll(@Param('recipeId') recipeId: number, @Request() req) {
    const recipe = await this.recipeService.getRecipeById(recipeId);
    return this.stepsService.removeAllSteps(recipe, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateAll(
    @Param('recipeId') recipeId: number,
    @Body() updateStepsDto: UpdateStepDto[],
    @Request() req
  ) {
    const recipe = await this.recipeService.getRecipeById(recipeId);
    return this.stepsService.updateAllSteps(updateStepsDto, req.user, recipe);
  }
}
