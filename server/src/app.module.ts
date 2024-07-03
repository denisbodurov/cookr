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
<<<<<<< Updated upstream
import { typeOrmAsyncConfig } from './config/typeorm.config';
=======
import { ThrottlerModule } from '@nestjs/throttler';
>>>>>>> Stashed changes

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
<<<<<<< Updated upstream
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
=======
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
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
>>>>>>> Stashed changes
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
