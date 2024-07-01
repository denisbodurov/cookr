import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, Unique, OneToOne, JoinColumn} from 'typeorm';
import { IsEmail, Length, IsNotEmpty } from 'class-validator';
import * as argon2 from 'argon2';
import { RecipeEntity } from 'src/recipe/entities/recipe.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('rating')
export class RatingEntity {

  @PrimaryGeneratedColumn()
  rating_id: number;

  @Column()
  @OneToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn()
  rater_id: number;

  @Column()
  @OneToOne(() => RecipeEntity, (recipe) => recipe.recipe_id)
  @JoinColumn()
  rated_id: number;

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