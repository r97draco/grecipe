const RecipeService = require('../services/RecipeService');
const itemsService = require('../services/ItemService');
const userService = require('../services/UserService');

const getRecipes = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const ingredients = await itemsService.getItemsByUser(userId);
    console.log(ingredients);
    // const preferences = await userService.getUserPreferences(userId);
    const preferences = {};
    const recipes = await RecipeService.searchRecipesByItems(
      ingredients,
      preferences
    );
    res.status(200).json({ recipes });
  } catch (err) {
    next(err);
  }
};

const getMealPlans = async (req, res, next) => {
  const { id } = req.params;
  try {
    const options = await userService.getUserPreferences(id);
    const mealPlans = await RecipeService.generateMealPlan(options);
    res.status(200).json({ mealPlans });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecipes,
  getMealPlans,
};
