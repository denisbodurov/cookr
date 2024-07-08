import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductById(productId: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({ where: { product_id: productId } });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return await this.productRepository.save(createProductDto);
  }

  async updateProduct(productId: number, updateProductDto: ProductEntity): Promise<ProductEntity> {
    await this.productRepository.update({ product_id: productId }, updateProductDto);
    return await this.productRepository.findOne({ where: { product_id: productId } });
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.productRepository.delete({ product_id: productId });
  }

}
