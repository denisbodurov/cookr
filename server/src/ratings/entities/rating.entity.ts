import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Entity('rating')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  rating_id: number;

  @Column()
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  rater: UserEntity;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ratings)
  recipe: RecipeEntity;

  @CreateDateColumn()
  created_at: Date;
}
