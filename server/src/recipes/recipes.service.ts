import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createRecipe(createRecipeDto: CreateRecipeDto, user: TokenPayload): Promise<RecipeEntity> {
    const recipe = this.recipeRepository.create({
      author_id: user.sub,
      ...createRecipeDto,
    });

    return await this.recipeRepository.save(recipe);
  }

}
