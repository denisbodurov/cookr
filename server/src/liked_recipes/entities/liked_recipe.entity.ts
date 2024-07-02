import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';

@Entity('rating')
export class LikedRecipesEntity {

  @PrimaryGeneratedColumn()
  like_id: number;

  @Column()
  @OneToOne(() => RecipeEntity, (recipe) => recipe.recipe_id)
  @JoinColumn()
  recipe_id: number;
  
}