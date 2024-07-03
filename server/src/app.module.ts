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
import { ThrottlerModule } from '@nestjs/throttler';
import { typeOrmAsyncConfig } from "./config/typeorm.config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get('THROTTLER_TTL'),
          limit: configService.get('THROTTLER_LIMIT'),
        },
      ],
      inject: [ConfigService],
    }),
    AuthModule,
    RecipesModule,
    UsersModule,
    RatingsModule,
    LikedRecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
