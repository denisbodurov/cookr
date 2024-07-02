import { Test, TestingModule } from '@nestjs/testing';
import { LikedRecipesService } from './liked_recipes.service';

describe('LikedRecipesService', () => {
  let service: LikedRecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikedRecipesService],
    }).compile();

    service = module.get<LikedRecipesService>(LikedRecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
