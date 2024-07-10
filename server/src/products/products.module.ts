import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Unit } from './entities/unit.entity';
import { ProductType } from './entities/product_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, Unit, ProductType])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductModule {}
