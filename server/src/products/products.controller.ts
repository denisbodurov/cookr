import { Controller, Get, Param, Post, Body, Delete, Put, UseGuards, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  @Get('/name/:product_name')
  async getProductByName(@Param('product_name') product_name: string): Promise<ProductEntity[]> {
    return this.productService.getProductByName(product_name);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateProduct(@Param('productId') productId: number, @Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteProduct(@Param('productId') productId: number): Promise<void> {
    return this.productService.deleteProduct(productId);
  }
}
