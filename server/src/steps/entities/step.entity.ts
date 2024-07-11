import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Entity('steps')
export class StepEntity {
  @PrimaryGeneratedColumn()
  step_id: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps_details)
  @JoinColumn({name: 'recipe_id'})
  recipe: RecipeEntity;

  @Column()
  recipe_id: number;

  @Column()
  step_number: number;

  @Column('text')
  description: string;
}
