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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'cookr',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,

      }),
      inject: [ConfigService]
  }),
    AuthModule,
    RecipesModule,
    UsersModule,
    RatingsModule,
    LikedRecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}