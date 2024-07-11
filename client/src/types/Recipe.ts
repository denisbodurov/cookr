import { Author } from "./Author";
import { LikedRecipe } from "./LikedRecipe";

export interface Recipe {
  recipeId: number;
  name: string;
  image: string;
  recipeType: string;
  author: Author;
  likedRecipes: LikedRecipe[];
  averageRating: number;
}
