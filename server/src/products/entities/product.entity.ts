import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductCategory, ProductType } from '../enums/products.enum';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'text', default: '', nullable: false })
  product_name: string;

  @Column({ type: 'text', default: '' })
  image: string;

  // @Column({ type: 'int', default: 0})
  // product_calorie: number;

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

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.product)
  ingredients: IngredientEntity[];
}
