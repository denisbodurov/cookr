import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinTable,
  OneToMany,
  Unique,
  OneToOne,
} from 'typeorm';
import * as argon2 from 'argon2';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
@Unique(['username', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  @OneToOne(() => RecipeEntity, (recipe) => recipe.author_id)
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany((type) => RecipeEntity, (recipe) => recipe.author_id)
  @JoinTable()
  recipes: RecipeEntity[];
}
