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
  
}