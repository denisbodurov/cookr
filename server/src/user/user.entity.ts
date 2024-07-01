import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, Unique} from 'typeorm';
import { IsEmail, Length, IsNotEmpty } from 'class-validator';
import * as argon2 from 'argon2';
import { RecipeEntity } from 'src/recipe/recipe.entity';

@Entity('user')
@Unique(['username'])
export class UserEntity {

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: Blob;

  @Column()
  @Length(6, 30, { message: 'The password must be at least 6 but not longer than 30 characters' })
  @IsNotEmpty({ message: 'The password is required' })
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(type => RecipeEntity, recipe => recipe.author_id)
  @JoinTable()
  recipes: RecipeEntity[];

  
}