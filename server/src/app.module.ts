import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { RatingsModule } from './ratings/ratings.module';
import { LikedRecipesModule } from './liked_recipes/liked_recipes.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { typeOrmAsyncConfig } from "./config/typeorm.config"
import { throttlerAsyncConfig } from './config/throttler.config';
import { ProductModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ThrottlerModule.forRootAsync(throttlerAsyncConfig),
    AuthModule,
    RecipesModule,
    UsersModule,
    ProductModule,
    RatingsModule,
    LikedRecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
