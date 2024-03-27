const RecipeService = require('../services/RecipeService');
const itemsService = require('../services/ItemService');
const userService = require('../services/UserService');

const getRecipes = async (req, res, next) => {
  const { userId } = req.params;
  console.log('Get recipes hit');
  try {
    // const user = await userService.getUserById(userId);
    const user = await userService.getUserByEmail(userId);
    const ingredients = await itemsService.getItemsByFamily(user.family);
    console.log(ingredients);
    const recipes = await RecipeService.searchRecipesByItems(ingredients);
    res.status(200).json({ recipes });
  } catch (err) {
    next(err);
  }
};

const getCustomRecipees = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserByEmail(userId);
    const ingredients = req.body.ingredients;
    console.log(ingredients);
    const recipes = await RecipeService.searchRecipesByItems(ingredients);
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
  getCustomRecipees,
};
