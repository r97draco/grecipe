import React, { useContext, useState } from "react";
import RecipeModal from "../components/RecipeModal";
import { Button } from "@mui/material";
import axios from "axios";
import { UserContext } from "../App";
import { backendUrl } from "../App";

const Recipee = () => {
  const [ingredients, setIngredients] = useState("onions, potato, bacon");
  const [recipes, setRecipes] = useState([]);

  // Handle changes in the textarea
  const handleIngredientChange = (event) => {
    setIngredients(event.target.value);
  };

  // Call an API to get recipes based on ingredients
  const generateRecipes = async () => {
    try {
      const recipeData = await fetchRecipesByIngredients(ingredients);
      setRecipes(recipeData);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const userModel = useContext(UserContext);
  const user = userModel.user;

  const getRecipeFromInventory = async () => {
    try {
      const recipeData = await axios.get(
        `$
      {backendUrl}/api/recipes/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("self_care_token")}`,
          },
        }
      );
      setRecipes(recipeData);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const getRecipeFromIngredients = async () => {
    try {
      const recipeData = await axios.get(
        // `${backendUrl}/api/recipes/${user.email}`,
        {
          ingredients: ingredients,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("self_care_token")}`,
          },
        }
      );
      setRecipes(recipeData);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-10 pb-12 md:pt-10 md:pb-20">
          {/* Title */}
          <div className="pb-12 text-center md:pb-16">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-400">
                Recipe
              </span>
            </h1>
            <p className="text-xl text-gray-600 md:text-2xl">
              A simple recipe app built with React, Express, and MongoDB.
            </p>
          </div>

          {/* Input and Button */}
          <div>
            <Button onClick={() => getRecipeFromInventory()}>
              Get Recepies from Inventory
            </Button>

            <Button>Get Recepies from Ingredients</Button>
          </div>
          <div className="my-2">
            Select the Inventory Items or Enter them:
            <label className="text-gray-700" htmlFor="comment">
              <textarea
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="comment"
                onChange={handleIngredientChange}
                placeholder="Enter your ingredients"
                name="comment"
                rows="5"
                cols="40"
              ></textarea>
            </label>
            <button
              type="button"
              disabled={!ingredients}
              onClick={generateRecipes}
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in shadow-md bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-slate-400"
            >
              Generate Recipes
            </button>
          </div>
          {/* Recipe Display */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recipes &&
              recipes.map((recipe) => (
                <div
                  className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg md:flex-row hover:shadow-xl"
                  key={recipe.id}
                >
                  <div className="flex-shrink-0 md:w-48">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="object-cover w-full h-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4">
                    <h3 className="mb-2 text-xl font-semibold">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-700">
                      Used Ingredients: {recipe.usedIngredientCount}
                    </p>
                    <p className="mb-4 text-gray-700">
                      Missed Ingredients: {recipe.missedIngredientCount}
                    </p>
                    {/* Additional details can be added here */}
                    <RecipeModal recipe={recipe} setRecipe={setRecipes} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipee;

// Helper function to call the API
const fetchRecipesByIngredients = async (ingredients) => {
  const apiKey = process.env.REACT_APP_SPOON_KEY; // Replace with your Spoonacular API key
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
    ingredients
  )}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchRecipesByIngredients:", error);
    return [];
  }
};
