interface RecipeType {
    name: string;
  }
  
  interface Author {
    username: string;
    firstName: string;
    lastName: string;
    image: string;
  }
  
  interface StepDetails {
    stepNumber: number;
    description: string;
  }
  
  interface Product {
    productId: number;
    productName: string;
    image: string;
    percentCarbs: number;
    percentFats: number;
    percentProtein: number;
    calories: number;
  }

  interface Rater {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    image: string;
  }
  
  interface Rating {
    description: string;
    rating: number;
    rater: Rater;
  }
  
  
  interface Ingredient {
    quantity: number;
    product: Product;
  }
  
  export interface SingleRecipe {
    recipeId: number;
    authorId: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    ratings: Rating[];
    recipeType: RecipeType;
    author: Author;
    stepsDetails: StepDetails[];
    ingredients: Ingredient[];
    likedRecipes: any[];
  }
  