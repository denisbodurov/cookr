import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Entity('liked_recipes')
export class LikedRecipesEntity {
  @PrimaryGeneratedColumn()
  like_id: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.likedRecipes)
  @JoinColumn({name: 'recipe_id'})
  recipe: RecipeEntity;

  @ManyToOne(() => UserEntity, (user) => user.likedRecipes)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;
}
