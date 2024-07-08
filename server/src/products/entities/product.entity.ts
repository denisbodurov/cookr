import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Units, ProductType } from '../enums/products.enum';

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

  // @Column({
  //   type: 'enum',
  //   enum: ProductCategory,
  // })
  // product_category: ProductCategory;

  @Column({
    type: 'enum',
    enum: Units,
  })
  unit: Units;

  @Column({ type: 'int', default: 0 })
  percent_carbs: number;

  @Column({ type: 'int', default: 0 })
  percent_fats: number;

  @Column({ type: 'int', default: 0 })
  percent_protein: number;

  @Column({ type: 'int', default: 0 })
  calories: number;

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.product)
  ingredients: IngredientEntity[];
}
