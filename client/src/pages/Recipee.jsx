import React, { useContext, useEffect, useState } from "react";
import RecipeModal from "../components/RecipeModal";
import { Button } from "@mui/material";
import axios from "axios";
import { UserContext, backendUrl } from "../App";

// const Recipee = () => {
//   const [ingredients, setIngredients] = useState("onions, potato, bacon");
//   const [recipes, setRecipes] = useState([]);
//   const userModel = useContext(UserContext);
//   const user = userModel.user;

//   const handleIngredientChange = (event) => {
//     setIngredients(event.target.value);
//   };

//   useEffect(() => {
//     setRecipes(testData.recipes);
//   }, []);

//   const getRecipeFromInventory = async () => {
//     try {
//       const recipeData = await axios.get(
//         `${backendUrl}/api/recipe/${user.email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("self_care_token")}`,
//           },
//         }
//       );
//       setRecipes(recipeData.data.recipes);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };

//   const getRecipeFromIngredients = async () => {
//     // Assuming this function is correctly implemented as your API's requirement.
//   };

//   return (
//     <section className="relative">
//       <div className="text-center">
//         <h1 className="text-5xl font-bold">Recipe Finder</h1>
//         <p>Discover recipes from your ingredients</p>
//       </div>
//       <div>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={getRecipeFromInventory}
//         >
//           Get Recipes from Inventory
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={getRecipeFromIngredients}
//         >
//           Get Recipes from Ingredients
//         </Button>
//         <textarea
//           className="w-full p-2 border rounded"
//           placeholder="Enter ingredients"
//           value={ingredients}
//           onChange={handleIngredientChange}
//         />
//       </div>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         {recipes.map((recipe) => (
//           <div key={recipe.id} className="card">
//             <img
//               src={recipe.image}
//               alt={recipe.title}
//               className="object-cover w-full h-48"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold">{recipe.title}</h3>
//               {/* Displaying used and missed ingredients if needed */}
//               <div className="text-gray-600">
//                 <p>Used Ingredients: {recipe.usedIngredientCount}</p>
//                 <p>Missed Ingredients: {recipe.missedIngredientCount}</p>
//               </div>
//               <RecipeModal recipe={recipe} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Recipee;


const Recipee = () => {
  const [ingredients, setIngredients] = useState("onions, potato, bacon");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(testData.recipes);
  }, []);

  const handleIngredientChange = (event) => {
    setIngredients(event.target.value);
  };

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
        `${backendUrl}/api/recipe/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("self_care_token")}`,
          },
        }
      );
      console.log("recipeData", recipeData);
      setRecipes(recipeData.data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const getRecipeFromIngredients = async () => {
    try {
      const recipeData = await axios.get(
        `${backendUrl}/api/recipes/${user.email}`,
        {
          ingredients: ingredients,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("self_care_token")}`,
          },
        }
      );
      setRecipes(recipeData.data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-10 pb-12 md:pt-10 md:pb-20">
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

          <div className="flex justify-between">
            <Button variant="contained" onClick={() => getRecipeFromInventory()}>
              Get Recepies from Inventory
            </Button>

            <Button variant="contained" disabled={!ingredients} onClick={()=> getRecipeFromIngredients()}>Get Recepies from Ingredients</Button>
          </div>
          <div className="my-2">
            Select the Inventory Items or Enter them:
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
            {/* <button
              type="button"
              disabled={!ingredients}
              onClick={generateRecipes}
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in shadow-md bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-slate-400"
            >
              Generate Recipes
            </button> */}
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
    </section>
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
