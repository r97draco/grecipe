const axios = require('axios');
const ApiError = require('../utils/ApiError');

const SpoonacularService = {
  async searchRecipesByItems(ingredients, preferences) {
    const apiKey = process.env.SPOONACULAR_API_KEY || '';
    const apiUrl = 'https://api.spoonacular.com/recipes/findByIngredients';
    const queryParams = {
      apiKey,
      ingredients: ingredients.join(','),
      ...preferences,
      // includeNutrition: true // Request to include nutrition information
    };

    try {
      const response = await axios.get(apiUrl, { params: queryParams });
      const recipes = response.data.map((recipe) => ({
        ...recipe,
        // calories: recipe.nutrition.caloricBreakdown.percentProtein
      }));
      return recipes;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch recipes from Spoonacular API');
    }
  },

  async generateMealPlan(options) {
    const apiKey = process.env.SPOONACULAR_API_KEY || '';
    const apiUrl = 'https://api.spoonacular.com/recipes/mealplans/generate';
    const queryParams = {
      apiKey,
      ...options,
    };

    try {
      const response = await axios.get(apiUrl, { params: queryParams });
      const mealPlan = response.data;
      return mealPlan;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch meal plan from Spoonacular API');
    }
  },
};

module.exports = SpoonacularService;
