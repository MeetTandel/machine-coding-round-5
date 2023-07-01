export const RecipeReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_RECIPE":
      localStorage.setItem(
        "recipes",
        JSON.stringify([...state.recipes, payload])
      );
      return {
        ...state,
        recipes: [...state.recipes, payload],
      };
    case "EDIT_RECIPE":
      localStorage.setItem(
        "recipes",
        JSON.stringify(
          state.recipes.map((item) =>
            item.id === payload.id ? { ...item, ...payload } : item
          )
        )
      );
      return {
        ...state,
        recipes: state.recipes.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      };

    case "DELETE_RECIPE":
      localStorage.setItem(
        "recipes",
        JSON.stringify(state.recipes.filter((item) => item.id !== payload))
      );
      return {
        ...state,
        recipes: state.recipes.filter((item) => item.id !== payload),
      };
    case "SET_FILTER_TYPE":
      return {
        ...state,
        filterType: payload
      };
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: payload
      };
    default:
      return { ...state };
  }
};
