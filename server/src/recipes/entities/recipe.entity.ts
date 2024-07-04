import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { RatingEntity } from 'src/ratings/entities/rating.entity';
import { LikedRecipesEntity } from 'src/liked_recipes/entities/liked_recipe.entity';
import { StepEntity } from 'src/steps/entities/step.entity';

export enum RecipeType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  DESSERT = 'dessert',
  SNACK = 'snack',
}

@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  recipe_id: number;

  @ManyToOne(() => UserEntity, (user) => user.recipes)
  author: UserEntity;

  @Column()
  name: string;

  @Column({ type: 'text', default: '' })
  steps: string;

  @Column({ type: 'text', default: '' })
  image: string;

  @Column({
    type: 'enum',
    enum: RecipeType,
  })
  recipe_type: RecipeType;

  @OneToMany(() => RatingEntity, (rating) => rating.recipe)
  ratings: RatingEntity[];

  @OneToMany(() => LikedRecipesEntity, (likedRecipe) => likedRecipe.recipe)
  likedRecipes: LikedRecipesEntity[];

  @OneToMany(() => StepEntity, (step) => step.recipe)
  stepsDetails: StepEntity[];
}
