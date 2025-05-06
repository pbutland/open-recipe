import { Router, RequestHandler } from 'express';
import { getIngredientsByRecipe, getShoppingItems } from '../controllers/ingredientController';

const router = Router();

/**
 * @route GET /api/v1/recipes/:recipeId/ingredients
 * @desc Get all ingredients for a specific recipe
 * @param {string} recipeId - The unique identifier of the recipe
 * @returns {Array} Array of ingredient objects from the recipe
 * @throws {NotFoundError} If recipe with the specified ID is not found
 */
router.get('/recipes/:recipeId/ingredients', getIngredientsByRecipe as RequestHandler);

/**
 * @route GET /api/v1/shoppingitems
 * @desc Get all unique products from all recipes that can be used for a shopping list
 * @returns {Array} Array of unique product objects
 */
router.get('/shoppingitems', getShoppingItems as RequestHandler);

export default router;
