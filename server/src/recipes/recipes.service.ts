import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
    const { steps, image } = createRecipeDto;
    const newRecipe = this.recipeRepository.create({
      steps,
      image,
    });
    return await this.recipeRepository.save(newRecipe);
  }

  async findAll(): Promise<RecipeEntity[]> {
    return await this.recipeRepository.find();
  }

  async findOne(id: number): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: {recipe_id: id}
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity> {
    const { steps, image } = updateRecipeDto;

    const recipeToUpdate = await this.recipeRepository.findOne({
      where: {recipe_id: id}
    });

    if (!recipeToUpdate) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    recipeToUpdate.steps = steps;
    recipeToUpdate.image = image;
    return await this.recipeRepository.save(recipeToUpdate);
  }

  async delete(id: number): Promise<void> {
    const recipeToDelete = await this.recipeRepository.findOne({
      where: {recipe_id: id}
    });

    if (!recipeToDelete) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    await this.recipeRepository.delete(id);
  }
}
