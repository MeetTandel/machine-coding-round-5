import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { Recipe } from "../../components/Recipe";
import { useRecipes } from "../../context/RecipeContext";
import "./Home.css";

export const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const { recipes, filterType, searchValue, dispatch } = useRecipes();

  const handleClick = (event, type, recipe) => {
    setModalType(type);
    setSelectedRecipe(recipe ?? []);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="home__container">
      <div className="filter__container">
        <div className="input__container">
          <input
            type="text"
            placeholder="Search the item you want"
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH_VALUE", payload: e.target.value })
            }
          />
        </div>
        <div className="radio__container">
          <h6>Filters: </h6>
          <label className="radio">
            <input
              className="filters"
              name="sort"
              checked={filterType === "name"}
              type="radio"
              onClick={() =>
                dispatch({ type: "SET_FILTER_TYPE", payload: "name" })
              }
            />
            <span>Name</span>
          </label>
          <label className="radio">
            <input
              className="filters"
              name="sort"
              checked={filterType === "ingredients"}
              type="radio"
              onClick={() =>
                dispatch({ type: "SET_FILTER_TYPE", payload: "ingredients" })
              }
            />
            <span>Ingredients</span>
          </label>
          <label className="radio">
            <input
              className="filters"
              name="sort"
              checked={filterType === "cuisineType"}
              type="radio"
              onClick={() =>
                dispatch({ type: "SET_FILTER_TYPE", payload: "cuisineType" })
              }
            />
            <span>Cuisine</span>
          </label>
        </div>
      </div>

      <div className="recipes__container">
        {recipes.map((recipe, index) => (
          <div key={recipe.id} className="recipe" style={{}}>
            <div className="recipe__button__container">
              <EditOutlinedIcon
                onClick={(e) => handleClick(e, "edit", recipe)}
              />
              <DeleteOutlineOutlinedIcon
                onClick={() =>
                  dispatch({ type: "DELETE_RECIPE", payload: recipe.id })
                }
              />
            </div>
            <div className="image__container">
              <img src={recipe.imageURL} alt={`random-${index}`} />
            </div>
            <h4>{recipe.name}</h4>
            <div className="recipe__details">
              <div className="detail">
                <h6>Cuisine Type: </h6>
                <p>{recipe.cuisineType}</p>
              </div>
              <div className="detail clickable">
                <h6>Ingredients: </h6>
                <NavLink
                  to={`/recipe/${recipe.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <p>{"See Recipe >"}</p>
                </NavLink>
              </div>
              <div className="detail clickable">
                <h6>Instructions: </h6>
                <NavLink
                  to={`/recipe/${recipe.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <p>{"See Recipe >"}</p>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
        <div className="add-recipe">
          <AddCircleOutlineIcon
            style={{ color: "#D3D3D3", fontSize: "3rem" }}
            onClick={(e) => handleClick(e, "create")}
          />
        </div>
      </div>

      <Popover
        style={{
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        id={id}
        data-testid="popover"
        className="modal"
        MenuProps={{
          disableScrollLock: true,
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {modalType === "create" && (
          <Recipe handleClose={handleClose} type="create" />
        )}
        {modalType === "edit" && (
          <Recipe
            handleClose={handleClose}
            type="edit"
            selectedRecipe={selectedRecipe}
          />
        )}
      </Popover>
    </div>
  );
};
