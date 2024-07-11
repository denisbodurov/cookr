import React, { useEffect, useState } from "react";
import RecipeCard from "../components/recipeCard";
import { Recipe } from "../types/Recipe";
import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/keysToCamelCase";

const AllRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>([]);

  useEffect(() => {
    const response = axios.get(
      `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/recipes`
    );

    response.then((response) => {
      const data = convertKeysToCamelCase(response.data);
      console.log(data);
      setRecipes(data);
    });
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-center  w-full bg-backgroundLight p-20">
        <div className=" w-auto flex justify-center gap-5 flex-wrap">
          {recipes ? (
            recipes.map((recipe) => (
              <RecipeCard
                recipeId={recipe.recipeId}
                recipeName={recipe.name}
                recipeImage={recipe.image}
                rating={recipe.averageRating}
                firstName={recipe.author.firstName}
                lastName={recipe.author.lastName}
                username={recipe.author.username}
                userImage={recipe.author.image}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllRecipes;
