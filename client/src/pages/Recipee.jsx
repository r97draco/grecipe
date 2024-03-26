import React, { useState } from "react";
import RecipeModal from "../components/RecipeModal";
import "./Recipee.css";

const createRecipeComponent = (recipesData) => {
  return () => {
    const [ingredients, setIngredients] = useState("");
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };

    const filteredRecipes = recipesData.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase()) ||
        recipe.ingredientsText.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleIngredientClick = (ingredient) => {
      setIngredients((prevIngredients) =>
        prevIngredients ? `${prevIngredients}, ${ingredient}` : ingredient
      );
      setSearchText((prevSearchText) =>
        prevSearchText ? `${prevSearchText}, ${ingredient}` : ingredient
      );
    };

    return (
      <section className="relative">
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="pt-10 pb-12 md:pt-10 md:pb-20">
            {/* Title */}
            <div className="pb-12 text-center md:pb-16">
              <h1 className="mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">
                  Recipe
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-4">
          <input
            type="text"
            className="px-4 py-2 w-full border border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search recipes..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>

        {/* Ingredient List */}
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold">Select below:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Onions",
              "Potato",
              "Bacon",
              "Garlic cloves",
              "Olive oil",
              "Butter",
              "Fresh basil",
              "Parmesan cheese",
              "Broccoli",
              "Red onion",
            ].map((ingredient) => (
              <button
                key={ingredient}
                className="px-2 py-1 bg-gray-200 border border-orange-500 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onClick={() => handleIngredientClick(ingredient)}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Display */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredRecipes.map((recipe) => (
            <div
              className="recipe-card flex overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg md:flex-row hover:shadow-xl border border-orange-500"
              key={recipe.id}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover w-48 h-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              />
              <div className="flex-grow p-4">
                <h3 className="mb-2 text-xl font-semibold">{recipe.title}</h3>
                <p className="text-gray-700">
                  Used Ingredients: {recipe.usedIngredientCount}
                </p>
                <p className="mb-2 text-gray-700">
                  Missed Ingredients: {recipe.missedIngredientCount}
                </p>
                <ul className="pl-4">
                  {recipe.ingredientsText
                    .split("\n")
                    .map((ingredient, index) => (
                      <li key={index} className="text-gray-700">
                        {ingredient}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
};

const Recipee = createRecipeComponent([
  {
    id: 1,
    title: "Potato Salad",
    image:
      "https://sweetandsavorymeals.com/wp-content/uploads/2019/05/creamy-potato-salad-facebook.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    ingredientsText: `- 3 pounds Yukon gold potatoes*
    - 3 tablespoons white wine vinegar, divided
    - 1 ¼ teaspoon [kosher salt](https://www.acouplecooks.com/what-is-kosher-salt/), divided
    - 3 large celery stalks
    - 5 green onions, thinly sliced (both white and green portions)
    - ¼ cup red onion, minced
    - 2 tablespoons chopped fresh dill
    - ½ cup sweet pickle relish (or chopped dill pickles)
    - ½ cup mayonnaise
    - ½ cup sour cream (or Greek yogurt)
    - 3 tablespoons yellow mustard (or 2 yellow and 1 tablespoon Dijon)
    - 1 teaspoon celery seed`,
  },
  {
    id: 2,
    title: "Tomato Soup",
    image:
      "https://www.cookingclassy.com/wp-content/uploads/2020/10/tomato-soup-7.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    ingredientsText: `- 2 tablespoon olive oil
  - 4 garlic cloves, minced
  - 1 28-ounce can and 1 15-ounce can crushed fire roasted tomatoes
  - 1 quart [vegetable broth](https://www.acouplecooks.com/vegetable-broth/)
  - 1 teaspoon garlic powder
  - 1 teaspoon onion powder
  - ¾ teaspoon [kosher salt](https://www.acouplecooks.com/what-is-kosher-salt/), divided
  - 2 tablespoon salted butter
  - Optional: ½ cup chopped fresh basil, 1 splash heavy cream
  - [Gourmet grilled cheese](https://www.acouplecooks.com/gourmet-grilled-cheese/), for serving (optional!)`,
  },
  {
    id: 3,
    title: "Spinach Quiche",
    image:
      "https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Spinach-Quiche-17.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    ingredientsText: `- 1 [Homemade Quiche Crust](https://www.acouplecooks.com/quiche-crust-recipe/) (made through Step 4) or 1 refrigerated pie dough
  - 8 ounces frozen spinach
  - 1 tablespoon unsalted butter
  - ¼ cup white onion, finely minced
  - 2 garlic cloves, minced
  - 4 large eggs
  - ¾ cup 2% milk
  - ½ cup heavy cream
  - ½ teaspoon dried mustard
  - ¼ teaspoon dried dill
  - 1 teaspoon [kosher salt](https://www.acouplecooks.com/what-is-kosher-salt/), divided
  - Fresh ground black pepper
  - ¾ cup shredded cheddar cheese, plus more to garnish
  - ⅓ cup Parmesan cheese`,
  },
  {
    id: 4,
    title: "Broccoli Stir-Fry",
    image:
      "https://www.acouplecooks.com/wp-content/uploads/2020/01/Broccoli-Stir-Fry-019.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    ingredientsText: `- 1 1/2 pounds (2 large heads) broccoli
  - 1 head broccolini (or 1 additional head of broccoli)
  - 1 medium red onion
  - 1 orange bell pepper
  - 2 portobello mushroom caps
  - 3 garlic cloves
  - 2 teaspoons ginger, grated (about a 2-inch nub)
  - 2 tablespoons mirin
  - 2 tablespoons rice vinegar
  - 2 tablespoons soy sauce
  - 1 teaspoon Sriracha hot sauce
  - 2 tablespoons sesame oil (regular, not toasted)
  - Kosher salt
  - For the garnish: sliced green onion, sesame seeds (optional)
  - To serve as a main dish: Add ¾ cup cashews with broccoli*, or make Marinated Tofu or Sauteed Shrimp (with sesame oil and lime) and serve with rice`,
  },
]);

export default Recipee;
