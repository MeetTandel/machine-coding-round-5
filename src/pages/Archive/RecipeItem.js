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
          <div className="cuisine">
            <span className="detail">Cuisine:</span> {filteredRecipe.cuisineType}
          </div>
          <div className="ingredients">
            <span className="detail">Ingredients:</span> {filteredRecipe.ingredients}
          </div>
          <div className="instructions">
            <span className="detail">Instructions:</span>
          </div>
          <ol>
            {filteredRecipe.instructions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
