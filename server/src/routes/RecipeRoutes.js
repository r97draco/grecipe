const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

router.get("/:userId", recipeController.getRecipes);
router.get("/mealplans", recipeController.getMealPlans);


module.exports = router;