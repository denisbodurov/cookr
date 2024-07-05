import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Entity('steps')
export class StepEntity {
  @PrimaryGeneratedColumn()
  step_id: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.stepsDetails)
  @JoinColumn({name: 'recipe_id'})
  recipe: RecipeEntity;

  @Column()
  step_number: number;

  @Column('text')
  description: string;
}
