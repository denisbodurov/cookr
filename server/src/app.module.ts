import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { RatingModule } from './rating/rating.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UserModule, RecipeModule, RatingModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
