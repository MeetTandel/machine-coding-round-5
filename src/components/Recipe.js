import React, { useEffect, useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import { getRandomColors } from "../helpers/utils";
import "./Recipe.css";
import CloseIcon from "@material-ui/icons/Close";

export const Recipe = ({ handleClose, selectedRecipe, type }) => {
  const { recipes, dispatch } = useRecipes();

  const [recipeName, setRecipeName] = useState(selectedRecipe?.name ?? "");
  const [cuisineType, setCuisineType] = useState(selectedRecipe?.cuisineType ?? "");
  const [imageURL, setImageURL] = useState(selectedRecipe?.imageURL ?? "");
  const [ingredients, setIngredients] = useState(
    selectedRecipe?.ingredients ?? ""
  );
  const [instructions, setInstructions] = useState(
    selectedRecipe?.instructions.toString() ?? ""
  );
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (
  //     repeat.length > 0 ||
  //     (type === "edit" && selectedRecipe?.repeat?.length > 0)
  //   ) {
  //     setGoalDrop(
  //       goalsDropDown.map((item) => ({
  //         name: `${item.name} ${repeat}`,
  //         value: `${item.name} ${repeat}`,
  //       }))
  //     );
  //     setGoals(
  //       goals.includes("Daily") ||
  //         goals.includes("Weekly") ||
  //         goals.includes("Monthly")
  //         ? `${goals.split(" ").slice(0, -1).join(" ")} ${repeat}`
  //         : `${goals} ${repeat}`
  //     );
  //   }
  // }, [repeat]);

  return (
    <div className="modal__recipe__container">
      <div className="recipe__title__container">
        <h3 className="recipe__title">
          {type === "create" ? "New Recipe" : "Edit Recipe"}
        </h3>
        <div className="close__button" onClick={() => handleClose()}>
          <CloseIcon />
        </div>
      </div>

      <section className="grid">
        <div className="section__title">
          <label class="required">Recipe Name </label>
        </div>

        <div className="section__details">
          <input
            type="text"
            value={recipeName}
            onChange={(e) => {
              setError(null);
              setRecipeName(e.target.value);
            }}
          />
        </div>
        {error?.length > 0 && <p className="error">{error}</p>}
      </section>
      <section className="grid">
        <div className="section__title">
          <label class="required">Cuisine Type </label>
        </div>

        <div className="section__details">
          <input
            type="text"
            value={cuisineType}
            onChange={(e) => {
              setError(null);
              setCuisineType(e.target.value);
            }}
          />
        </div>
        {error?.length > 0 && <p className="error">{error}</p>}
      </section>
      <section className="grid">
        <div className="section__title">
          <label class="required">Image URL </label>
        </div>

        <div className="section__details">
          <input
            type="text"
            value={imageURL}
            onChange={(e) => {
              setError(null);
              setImageURL(e.target.value);
            }}
          />
        </div>
        {error?.length > 0 && <p className="error">{error}</p>}
      </section>
      <section className="grid">
        <div className="section__title">
          <label class="required">Ingredients </label>
        </div>

        <div className="section__details">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => {
              setError(null);
              setIngredients(e.target.value);
            }}
          />
        </div>
        {error?.length > 0 && <p className="error">{error}</p>}
      </section>
      <section className="grid">
        <div className="section__title">
          <label class="required">Instructions </label>
        </div>

        <div className="section__details">
          <textarea
            value={instructions}
            onChange={(e) => {
              setError(null);
              setInstructions(e.target.value);
            }}
            rows={5}
          />
        </div>
        {error?.length > 0 && <p className="error">{error}</p>}
      </section>
      <section className="buttons">
        <button
          className="save"
          onClick={() => {
            dispatch({
              type: type === "create" ? "ADD_RECIPE" : "EDIT_RECIPE",
              payload: {
                id: type === "create" ? recipes.length + 1 : selectedRecipe.id,
                name: recipeName,
                cuisineType: cuisineType,
                ingredients: ingredients,
                instructions: instructions.split(","),
                imageURL: imageURL,
              },
            });
            handleClose();
          }}
        >
          Save
        </button>
      </section>
    </div>
  );
};
