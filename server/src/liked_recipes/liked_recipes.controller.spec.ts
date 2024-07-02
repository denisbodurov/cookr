import { Test, TestingModule } from '@nestjs/testing';
import { LikedRecipesController } from './liked_recipes.controller';
import { LikedRecipesService } from './liked_recipes.service';

describe('LikedRecipesController', () => {
  let controller: LikedRecipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikedRecipesController],
      providers: [LikedRecipesService],
    }).compile();

    controller = module.get<LikedRecipesController>(LikedRecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
