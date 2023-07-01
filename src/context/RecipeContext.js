import { createContext, useContext, useReducer } from "react";
import { RecipeReducer } from "../reducers/RecipeReducer";
import recipes from "../data.json";

const RecipeContext = createContext();

const initialState = {
  recipes:
    localStorage.getItem("recipes") !== null
      ? JSON.parse(localStorage.getItem("recipes"))
      : recipes,
  filterType: "name",
  searchValue: "",
};

export function RecipeProvider({ children }) {
  const [recipeState, dispatch] = useReducer(RecipeReducer, initialState);

  const filteredRecipes =
    recipeState.searchValue !== ""
      ? recipeState.recipes.filter((item) =>
          item[recipeState.filterType]
            .toLowerCase()
            .includes(recipeState.searchValue.toLowerCase())
        )
      : recipeState.recipes;

  return (
    <RecipeContext.Provider
      value={{
        recipes: filteredRecipes,
        filterType: recipeState.filterType,
        searchValue: recipeState.searchValue,
        dispatch,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
export const useRecipes = () => useContext(RecipeContext);
