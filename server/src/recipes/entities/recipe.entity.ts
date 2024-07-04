import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  recipe_id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  steps: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @OneToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn()
  @Column()
  author_id: number;
}
