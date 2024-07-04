import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Entity('rating')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  rating_id: number;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  rater: UserEntity;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ratings)
  recipe: RecipeEntity;
}
