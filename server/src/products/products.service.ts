import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Unit } from './entities/unit.entity';
import { ProductType } from './entities/product_type.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(Unit)
    private readonly unitsRepository: Repository<Unit>,
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductById(productId: number) {
    const product = await this.productRepository.findOne({
      where: { product_id: productId },
    });

    if (!product) {
      throw new BadRequestException('product-not-found');
    }

    return product;
  }

  async getProductByName(product_name: string) {
    product_name.toLowerCase();
    const products = await this.productRepository.find({
      where: { product_name: ILike(`%${product_name}%`) },
    });

    if (!products) {
      throw new BadRequestException('product-not-found');
    }

    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    createProductDto.product_name.toLowerCase();
    return await this.productRepository.save(createProductDto);
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(
      { product_id: productId },
      updateProductDto,
    );
    return await this.productRepository.findOne({
      where: { product_id: productId },
    });
  }

  async deleteProduct(productId: number) {
    await this.productRepository.delete({ product_id: productId });
  }

  async getUnits(){
    return this.unitsRepository.find();
  }

  async getProductTypes(){
    return this.productTypeRepository.find();
  }
}
