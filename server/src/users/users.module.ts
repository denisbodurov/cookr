import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RecipesModule } from 'src/recipes/recipes.module';
import { LikedRecipesModule } from 'src/liked_recipes/liked_recipes.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RecipesModule, LikedRecipesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
