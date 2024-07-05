import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { TokenPayload } from 'src/auth/models/token.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  async getRecipesByUserId(userId: number): Promise<RecipeEntity[]> {
    return await this.recipeRepository.find({
      where: { author_id: userId },
    });
  }

  async getRecipeById(id: number): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: { recipe_id: id },
    });
    if (!recipe) {
      throw new NotFoundException('recipe-not-found');
    }
    return recipe;
  }

  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    const recipe = this.recipeRepository.create({
      author_id: user.sub,
      ...createRecipeDto,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await this.recipeRepository.save(recipe);
  }

  async updateRecipe(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    user: TokenPayload,
  ): Promise<RecipeEntity> {
    const recipe = await this.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('recipe-not-found');
    }
    if (recipe.author_id !== user.sub) {
      throw new UnauthorizedException();
    }

    await this.recipeRepository.update(id, {
      ...updateRecipeDto,
      updated_at: new Date(),
    });
    
    return await this.getRecipeById(id);
  }

  async deleteRecipe(id: number, user: TokenPayload): Promise<void> {
    const recipe = await this.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('recipe-not-found');
    }
    if (recipe.author_id !== user.sub) {
      throw new UnauthorizedException();
    }
    await this.recipeRepository.delete(id);
  }
}
