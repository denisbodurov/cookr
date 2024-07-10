import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('recipe_types')
export class RecipeType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  image: string;
}
