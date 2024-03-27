const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/RecipeController');
const authMiddleware = require('../middlewares/auth');

router.get('/:userId', recipeController.getRecipes);
router.get('/mealplans', authMiddleware, recipeController.getMealPlans);
router.post('/:userId', authMiddleware, recipeController.getCustomRecipees);

module.exports = router;
