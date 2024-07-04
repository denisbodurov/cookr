import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Entity('liked_recipes')
export class LikedRecipesEntity {
  @PrimaryGeneratedColumn()
  like_id: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.likedRecipes)
  recipe: RecipeEntity;

  @ManyToOne(() => UserEntity, (user) => user.likedRecipes)
  user: UserEntity;
}
