import { Controller, Get, Post, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LikedRecipesService } from './liked_recipes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { TokenPayload } from 'src/auth/models/token.model';

@ApiTags('liked-recipes')
@Controller('liked-recipes')
export class LikedRecipesController {
  constructor(private readonly likedRecipesService: LikedRecipesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':recipeId')
  async create(@Param('recipeId') recipeId: string, @User() user: TokenPayload,) {
    return this.likedRecipesService.create(+recipeId, user.sub);
  }

  @Get()
  async findAll() {
    return this.likedRecipesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.likedRecipesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':recipeId')
  async remove(@Param('recipeId') recipeId: string, @User() user: TokenPayload,) {
    return this.likedRecipesService.remove(+recipeId, user.sub);
  }

  @Get(':recipeId/likes')
  async countLikes(@Param('recipeId') recipeId: string) {
    return this.likedRecipesService.countLikes(+recipeId);
  }
}
