import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('rating')
export class RatingEntity {

  @PrimaryGeneratedColumn()
  rating_id: number;

  @Column()
  @OneToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn()
  rater_id: number;

  @Column()
  @OneToOne(() => RecipeEntity, (recipe) => recipe.recipe_id)
  @JoinColumn()
  rated_id: number;
  
}