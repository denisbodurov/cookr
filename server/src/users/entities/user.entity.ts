import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { RatingEntity } from 'src/ratings/entities/rating.entity';
import { LikedRecipesEntity } from 'src/liked_recipes/entities/liked_recipe.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
@Unique(['username', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ default: '' })
  image: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => RecipeEntity, (recipe) => recipe.author)
  recipes: RecipeEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.rater)
  ratings: RatingEntity[];

  @OneToMany(() => LikedRecipesEntity, (likedRecipe) => likedRecipe.user)
  likedRecipes: LikedRecipesEntity[];
}
