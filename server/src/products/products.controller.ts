import { Controller, Get, Param, Post, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ProductEntity[]> {
    return this.productService.getProducts();
  }

  @Get(':productId')
  async getProductById(@Param('productId') productId: number): Promise<ProductEntity> {
    return this.productService.getProductById(productId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createProduct(@Body() createProductDto: ProductEntity): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateProduct(@Param('productId') productId: number, @Body() updateProductDto: ProductEntity): Promise<ProductEntity> {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteProduct(@Param('productId') productId: number): Promise<void> {
    return this.productService.deleteProduct(productId);
  }
}
