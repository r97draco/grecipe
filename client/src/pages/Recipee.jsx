import React, { useContext, useEffect, useState } from "react";
import RecipeModal from "../components/RecipeModal";
import { Button } from "@mui/material";
import axios from "axios";
import { UserContext, backendUrl } from "../App";
import { notify } from "../components/Nav";
import Footer from "../components/Footer";

const Recipee = () => {
  const [ingredients, setIngredients] = useState("onions, potato, bacon");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(testData.recipes);
  }, []);

  const handleIngredientChange = (event) => {
    setIngredients(event.target.value);
  };

  const userModel = useContext(UserContext);
  const user = userModel.user;

  const getRecipeFromInventory = async () => {
    try {
      const recipeData = await axios.get(
        `${backendUrl}/api/recipe/${user.email}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("self_care_token")}`,
          },
        }
      );
      console.log("recipeData", recipeData);
      setRecipes(recipeData.data.recipes);
      notify("Recipes fetched from Inventory", "success");
    } catch (error) {
      console.error("Error fetching recipes:", error);
      notify("Error fetching recipes", "error");
      if (error.response.status === 401) {
        notify("Please login to view recipes", "info");
      }
    }
  };

  const getRecipeFromIngredients = async () => {
    if (!ingredients) {
      notify("Please enter ingredients", "error");
      return;
    }

    try {
      const recipeData = await axios.get(
        `${backendUrl}/api/recipe/${user.email}`,
        {
          ingredients: ingredients,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("self_care_token")}`,
          },
        }
      );
      setRecipes(recipeData.data.recipes);
      notify("Recipes fetched from Ingredients", "success");
    } catch (error) {
      notify("Error fetching recipes", "error");
      console.error("Error fetching recipes:", error);
      if (error.response.status === 401) {
        notify("Please login to view recipes", "info");
      }
    }
  };

  return (
    <div className="main-bg">
      <section className="relative ">
        <div className="col-span-1 px-4 mx-auto bg-white bg-opacity-50 rounded-lg max-w-7xl sm:px-6 backdrop-blur-md">
          <div className="max-w-6xl px-4 mx-auto sm:px-6">
            <div className="pt-10 pb-12 md:pt-10 md:pb-20">
              <div className="pb-12 text-center md:pb-16">
                <h1 className="mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-400">
                    Recipe
                  </span>
                </h1>
                <p className="text-xl text-gray-900 md:text-lg">
                  View all the recipes you can make with the ingredients you
                  have!!
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => getRecipeFromInventory()}
                  className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 "
                >
                  Get Recepies from Inventory
                </button>
                <button
                  disabled={!ingredients}
                  onClick={() => getRecipeFromIngredients()}
                  className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600"
                >
                  Get Recipes from Ingredients
                </button>
              </div>
              <div className="my-2">
                Enter the Ingredients:
                <label className="text-gray-700" htmlFor="comment">
                  <textarea
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={handleIngredientChange}
                    placeholder="Enter your ingredients"
                    value={ingredients}
                    rows="2"
                    // cols="40"
                  ></textarea>
                </label>
              </div>

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
                        <RecipeModal recipe={recipe} setRecipe={setRecipes} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Recipee;

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

const testData = {
  recipes: [
    {
      id: 640457,
      title: "Crash Hot Potatoes",
      image: "https://img.spoonacular.com/recipes/640457-312x231.jpg",
      imageType: "jpg",
      usedIngredientCount: 1,
      missedIngredientCount: 2,
      missedIngredients: [
        {
          id: 2036,
          amount: 1,
          unit: "Sprigs",
          unitLong: "Sprig",
          unitShort: "Sprigs",
          aisle: "Spices and Seasonings",
          name: "rosemary",
          original: "Sprigs of Rosemary, finely chopped",
          originalName: "Rosemary, finely chopped",
          meta: ["finely chopped"],
          image: "https://img.spoonacular.com/ingredients_100x100/rosemary.jpg",
        },
        {
          id: 1033,
          amount: 4,
          unit: "servings",
          unitLong: "servings",
          unitShort: "servings",
          aisle: "Cheese",
          name: "cheese",
          original: "Grated Cheese (Parmesan, Locatelli-Romano, etc)",
          originalName: "Grated Cheese (Parmesan, Locatelli-Romano, etc)",
          meta: ["grated", "(Parmesan, Locatelli-Romano, etc)"],
          image: "https://img.spoonacular.com/ingredients_100x100/parmesan.jpg",
        },
      ],
      usedIngredients: [
        {
          id: 10211352,
          amount: 4,
          unit: "servings",
          unitLong: "servings",
          unitShort: "servings",
          aisle: "Produce",
          name: "new potatoes",
          original: "new potatoes (red or russet)",
          originalName: "new potatoes (red or russet)",
          meta: ["red", "( or russet)"],
          extendedName: "red new potatoes",
          image:
            "https://img.spoonacular.com/ingredients_100x100/new-potatoes.jpg",
        },
      ],
      unusedIngredients: [
        {
          id: 11203,
          amount: 1,
          unit: "serving",
          unitLong: "serving",
          unitShort: "serving",
          aisle: "Produce",
          name: "name: 'garden tomato",
          original: "name: 'Garden tomato'",
          originalName: "name: 'Garden tomato",
          meta: [],
          image:
            "https://img.spoonacular.com/ingredients_100x100/watercress.jpg",
        },
        {
          id: 1015006,
          amount: 1,
          unit: "serving",
          unitLong: "serving",
          unitShort: "serving",
          aisle: "Meat",
          name: "name: 'chicken",
          original: "name: 'Chicken'",
          originalName: "name: 'Chicken",
          meta: [],
          image:
            "https://img.spoonacular.com/ingredients_100x100/whole-chicken.jpg",
        },
      ],
      likes: 1,
    },
    {
      id: 637458,
      title: "Charlotte Potato Salad",
      image: "https://img.spoonacular.com/recipes/637458-312x231.jpg",
      imageType: "jpg",
      usedIngredientCount: 1,
      missedIngredientCount: 5,
      missedIngredients: [
        {
          id: 10123,
          amount: 75,
          unit: "grams",
          unitLong: "grams",
          unitShort: "g",
          aisle: "Meat",
          name: "bacon cubes",
          original: "75 grams bacon cubes",
          originalName: "bacon cubes",
          meta: [],
          image:
            "https://img.spoonacular.com/ingredients_100x100/raw-bacon.png",
        },
        {
          id: 1032046,
          amount: 1,
          unit: "teaspoon",
          unitLong: "teaspoon",
          unitShort: "tsp",
          aisle: "Condiments",
          name: "dijon mustard",
          original: "1 teaspoon Dijon mustard",
          originalName: "Dijon mustard",
          meta: [],
          image:
            "https://img.spoonacular.com/ingredients_100x100/dijon-mustard.jpg",
        },
        {
          id: 2029,
          amount: 1,
          unit: "pinch",
          unitLong: "pinch",
          unitShort: "pinch",
          aisle: "Spices and Seasonings",
          name: "parsley",
          original: "Pinch of dried parsley",
          originalName: "Pinch of dried parsley",
          meta: ["dried"],
          extendedName: "dried parsley",
          image:
            "https://img.spoonacular.com/ingredients_100x100/dried-parsley.png",
        },
        {
          id: 9152,
          amount: 0.5,
          unit: "",
          unitLong: "",
          unitShort: "",
          aisle: "Produce",
          name: "juice of lemon",
          original: "1/2 Lemon, juiced",
          originalName: "Lemon, juiced",
          meta: ["juiced"],
          extendedName: "lemon (juice)",
          image:
            "https://img.spoonacular.com/ingredients_100x100/lemon-juice.jpg",
        },
        {
          id: 11291,
          amount: 1,
          unit: "stalk",
          unitLong: "stalk",
          unitShort: "stalk",
          aisle: "Produce",
          name: "spring onions",
          original: "1 stalk Spring onions, finely chopped",
          originalName: "Spring onions, finely chopped",
          meta: ["finely chopped"],
          image:
            "https://img.spoonacular.com/ingredients_100x100/spring-onions.jpg",
        },
      ],
      usedIngredients: [
        {
          id: 10211352,
          amount: 500,
          unit: "grams",
          unitLong: "grams",
          unitShort: "g",
          aisle: "Produce",
          name: "charlotte potatoes",
          original: "500 grams Charlotte potatoes (or any new potato variety)",
          originalName: "Charlotte potatoes (or any new potato variety)",
          meta: ["or any new potato variety)"],
          image:
            "https://img.spoonacular.com/ingredients_100x100/new-potatoes.jpg",
        },
      ],
      unusedIngredients: [
        {
          id: 11203,
          amount: 1,
          unit: "serving",
          unitLong: "serving",
          unitShort: "serving",
          aisle: "Produce",
          name: "name: 'garden tomato",
          original: "name: 'Garden tomato'",
          originalName: "name: 'Garden tomato",
          meta: [],
          image:
            "https://img.spoonacular.com/ingredients_100x100/watercress.jpg",
        },
        {
          id: 1015006,
          amount: 1,
          unit: "serving",
          unitLong: "serving",
          unitShort: "serving",
          aisle: "Meat",
          name: "name: 'chicken",
          original: "name: 'Chicken'",
          originalName: "name: 'Chicken",
          meta: [],
          image:
            "https://img.spoonacular.com/ingredients_100x100/whole-chicken.jpg",
        },
      ],
      likes: 12,
    },
  ],
};
