import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RecipeModal({ recipe, setRecipe, foodId, setFoodId }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topNutrients, setTopNutrients] = useState([]);
  const [nutritionWidgetData, setNutritionWidgetData] = useState(null);

  // useEffect(() => {
  //   // setTimeout(() => {
  //     if (foodId) {
  //       setLoading(false);
  //       const newData = getRecipeNutritions(foodId);
  //       setNutritionWidgetData(newData);
  //     }
  //     return;
  //   // }, 5000);
  // }, [foodId]);

  const getRecipeNutritions = async (id) => {
    const apiKey = process.env.REACT_APP_SPOON_KEY; // Replace with your Spoonacular API key
    let url = `https://api.spoonacular.com/recipes/${foodId}/nutritionWidget.json?apiKey=${apiKey}`;

    try {
      const res = await axios.get(url);
      const calories = res.data.nutrients.find(
        (nutrient) => nutrient.name === "Calories"
      ); // Find calories data
      setRecipe({ ...recipe, calories: calories.amount + " " + calories.unit }); // Update recipe with calories
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }
  };

  return (
    <>
      <button
        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        View Recipe
      </button>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/* Content */}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-3xl font-semibold">{recipe.title}</h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={() => {
                      setRecipe(null);
                      setShowModal(false);
                    }}
                  >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative flex-auto p-6">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="mb-4 rounded-lg"
                  />
                  <div className="text-blueGray-500">
                    <strong className="text-lg">Top Nutrients:</strong>
                    <ul className="pl-5 list-disc">
                      {topNutrients.map((nutrient, index) => (
                        <li key={index} className="my-2">
                          {nutrient.name}: {nutrient.amount} {nutrient.unit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-blueGray-500">
                    <strong className="text-lg">Ingredients:</strong>
                    <ul className="pl-5 list-disc">
                      {recipe.usedIngredients.map((ingredient) => (
                        <li key={ingredient.id} className="my-2">
                          {ingredient.original}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <img
                    src={recipe.nutritionWidgetUrl}
                    alt="Nutrition Information"
                    className="mt-4 rounded-lg"
                  />
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => {
                      // setRecipe(null);
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
