import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateAllStepDto } from './dto/update-all-steps.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipesService } from 'src/recipes/recipes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenPayload } from 'src/auth/models/token.model';
import { User } from 'src/users/user.decorator';

  @ApiTags('steps')
  @Controller('recipes/:recipeId/steps')
  export class StepsController {
    constructor(
      private readonly stepsService: StepsService,
      private readonly recipeService: RecipesService,
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async create(
      @Param('recipeId') recipeId: number,
      @Body() createStepDto: CreateStepDto,
      @User() user: TokenPayload,
    ) {
      const recipe = await this.recipeService.getSimpleRecipeById(recipeId);
      return this.stepsService.create(createStepDto, user, recipe);
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
      const recipe = await this.recipeService.getSimpleRecipeById(recipeId);
      return this.stepsService.findOneByStepNumber(stepNumber, recipe);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch(':stepNumber')
    async update(
      @Param('recipeId') recipeId: number,
      @Param('stepNumber') stepNumber: number,
      @Body() updateStepDto: UpdateStepDto,
      @User() user: TokenPayload,
    ) {
      const recipe = await this.recipeService.getSimpleRecipeById(recipeId);
      return this.stepsService.update(stepNumber, updateStepDto, user, recipe);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':stepNumber')
    async remove(
      @Param('recipeId') recipeId: number,
      @Param('stepNumber') stepNumber: number,
      @User() user: TokenPayload,
    ) {
      const recipe = await this.recipeService.getSimpleRecipeById(recipeId);
      return this.stepsService.removeByStepNumber(stepNumber, user, recipe);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete()
    async removeAll(@Param('recipeId') recipeId: number, @User() user: TokenPayload,) {
      const recipe = await this.recipeService.getSimpleRecipeById(recipeId);
      return this.stepsService.removeAllSteps(recipe, user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch()
    async updateAll(
      @Param('recipeId') recipeId: number,
      @Body() updateStepsDto: UpdateAllStepDto[],
      @User() user: TokenPayload,
    ) {
      const recipe = await this.recipeService.getSimpleRecipeById(recipeId);
      return this.stepsService.updateAllSteps(updateStepsDto, user, recipe);
    }
  }
