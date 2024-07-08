import { ProductEntity } from 'src/products/entities/product.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('ingredients')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  ingredient_id: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ingredients)
  @JoinColumn({ name: 'recipe_id' })
  recipe: RecipeEntity;

  @Column()
  recipe_id: number;

  @ManyToOne(() => ProductEntity, (product) => product.ingredients)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;
}
