import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikedRecipesService } from 'src/liked_recipes/liked_recipes.service';
import { TokenPayload } from 'src/auth/models/token.model';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly recipeService: RecipesService,
    private readonly likedRecipesService: LikedRecipesService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':userId')
  getOne(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Get(':userId/recipes')
  getUserRecipes(@Param('userId') userId: number) {
    return this.recipeService.getRecipesByUserId(userId);
  }

  @Get(':userId/liked-recipes')
  getUserLikedRecipes(@Param('userId') userId: number) {
    return this.likedRecipesService.getLikedRecipesByUserId(userId);
  }

  @Patch('update-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateProfile(
    @User() user: TokenPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(user, updateUserDto);
  }

  
}
