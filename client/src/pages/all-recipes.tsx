import React, { useState } from "react";
import RecipeCard from "../components/recipeCard";
const AllRecipes: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center  w-full bg-backgroundLight p-20">
        <div className=" w-auto flex justify-center gap-5 flex-wrap">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
    </>
  );
};

export default AllRecipes;
