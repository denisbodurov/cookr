import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProductType } from './product_type.entity';
import { Unit } from './unit.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'text', default: '', nullable: false })
  product_name: string;

  @Column({ type: 'text', default: '' })
  image: string;

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

  @ManyToOne(() => Unit, { eager: true })
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @ManyToOne(() => ProductType, { eager: true })
  @JoinColumn({ name: 'product_type_id' })
  product_type: ProductType;
}
