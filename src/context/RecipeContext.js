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
  searchValue: ""
};

export function RecipeProvider({ children }) {
  const [recipeState, dispatch] = useReducer(RecipeReducer, initialState);


  
  return (
    <RecipeContext.Provider
      value={{
        recipes: recipeState.recipes,
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
