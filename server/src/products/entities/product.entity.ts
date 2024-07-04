import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ProductType {
  FRUITS = 'fruits',
  VEGETABLES = 'vegetables',
  MEAT = 'meat',
  DAIRY = 'dairy',
  GRAINS = 'grains',
  SEAFOOD = 'seafood',
}

export enum ProductCategory {
  PROTEIN = 'protein',
  CARBS = 'carbs',
  FATS = 'fats',
}

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'text', default: '' })
  product_name: string;

  @Column({ type: 'text', default: '' })
  image: string;

  @Column({
    type: 'enum',
    enum: ProductType,
  })
  product_type: ProductType;

  @Column({
    type: 'enum',
    enum: ProductCategory,
  })
  product_category: ProductCategory;
}
