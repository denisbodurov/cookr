import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ProductEntity, ProductType, ProductCategory } from './entities/product.entity'; // Adjust the import path as needed

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /*async fetchProductInfoFromApi(productId: number): Promise<any> {
    const options = {
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/${productId}/information`,
      params: { amount: '150', unit: 'grams' },
      headers: {
        'x-rapidapi-key': 'YOUR_API_KEY_HERE', // Replace with your actual API key
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Error fetching product information:', error);
      throw new Error('Failed to fetch product information');
    }
  }

  async createOrUpdateProduct(productId: number): Promise<ProductEntity> {
    const productInfo = await this.fetchProductInfoFromApi(productId);

    // Example of mapping API response to ProductEntity fields
    const product = new ProductEntity();
    product.product_id = productId;
    product.product_name = productInfo.name || '';
    product.image = productInfo.image || '';
    product.product_calorie = productInfo.nutrition?.calories || 0;
    product.product_type = ProductType[productInfo.aisle.toUpperCase()] || ProductType.GRAINS; // Adjust as needed
    product.product_category = ProductCategory.PROTEIN; // This is a placeholder; you may need additional logic

    return this.productRepository.save(product);
  }*/
}
