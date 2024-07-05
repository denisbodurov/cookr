import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  /*
  @Get()
  async getProducts(@Query('ids') ids: string) {
    const productIds = ids.split(',').map(id => parseInt(id.trim(), 10));
    return await this.productService.createOrUpdateProducts(productIds);
  }
  */
}
