import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useRecipes } from "../../context/RecipeContext";
import "./RecipeItem.css";

export const RecipeItem = () => {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const filteredRecipe = recipes.find((item) => item.id === Number(id));

  return (
    <div className="individual__recipe__container">
      <h1>{filteredRecipe.name}</h1>
      <div className="recipe__item">
        <div className="recipe__image__container">
          <img src={filteredRecipe.imageURL} />
        </div>
        <div className="details__container">
          <h4 className="cuisine">Cuisine: {filteredRecipe.cuisineType}</h4>
          <h4 className="cuisine">Ingredients: {filteredRecipe.ingredients}</h4>
          <h4 className="cuisine">Instructions:</h4>
          <h4> {filteredRecipe.instructions}</h4>
        </div>
      </div>
    </div>
  );
};
