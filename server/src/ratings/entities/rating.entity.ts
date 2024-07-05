import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'rater_id' })
  rater: UserEntity;

  @Column()
  rater_id: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ratings)
  @JoinColumn({ name: 'recipe_id' })
  recipe: RecipeEntity;

  @Column()
  recipe_id: number;
  

  @CreateDateColumn()
  created_at: Date;
}
