import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { RatingsModule } from './ratings/ratings.module';
import { LikedRecipesModule } from './liked_recipes/liked_recipes.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    RecipesModule,
    UsersModule,
    RatingsModule,
    LikedRecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
