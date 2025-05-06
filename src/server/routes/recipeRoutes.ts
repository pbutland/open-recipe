import { Router, RequestHandler } from 'express';
import { 
  getRecipes, 
  getRecipeById_controller, 
  createRecipe, 
  getRecipeSummaries_controller 
} from '../controllers/recipeController';

const router = Router();

/**
 * @route GET /api/v1/recipes
 * @desc Get all recipes or filter by query parameters
 * @param {string} [name] - Filter recipes by name (case-insensitive substring match)
 * @param {string} [type] - Filter recipes by type (e.g., 'main', 'dessert')
 * @param {string} [cuisine] - Filter recipes by cuisine (e.g., 'italian')
 * @param {string} [complexity] - Filter recipes by complexity level
 * @param {number} [servings] - Filter recipes by number of servings
 * @param {string|string[]} [tags] - Filter recipes by one or more tags
 * @param {number} [limit=20] - Number of recipes to return per page (max 100)
 * @param {number} [offset=0] - Number of recipes to skip (for pagination)
 * @returns {Object} JSON response with:
 *   - data: Array of recipe objects
 *   - _meta: Object with pagination metadata (totalItems, limit, offset, hasMore)
 *   - _links: Object with HATEOAS links (self, first, prev, next) for navigation
 */
router.get('/recipes', getRecipes as RequestHandler);

/**
 * @route GET /api/v1/recipes/summaries
 * @desc Get summary information about recipes with filtering and pagination
 * @param {string} [name] - Filter recipes by name (case-insensitive substring match)
 * @param {string} [type] - Filter recipes by type (e.g., 'main', 'dessert')
 * @param {string} [cuisine] - Filter recipes by cuisine (e.g., 'italian')
 * @param {string} [complexity] - Filter recipes by complexity level
 * @param {string|string[]} [tags] - Filter recipes by one or more tags
 * @param {number} [limit=20] - Number of recipes to return per page (max 100)
 * @param {number} [offset=0] - Number of recipes to skip (for pagination)
 * @returns {Object} JSON response with:
 *   - data: Array of recipe summary objects (id, name, description, type, cuisine, complexity, tags, imageUrls)
 *   - _meta: Object with pagination metadata (totalItems, limit, offset, hasMore)
 *   - _links: Object with HATEOAS links (self, first, prev, next) for navigation
 */
router.get('/recipes/summaries', getRecipeSummaries_controller as RequestHandler);

/**
 * @route GET /api/v1/recipes/:recipeId
 * @desc Get a specific recipe by ID
 * @param {string} recipeId - The unique identifier of the recipe
 * @returns {Object} Recipe object if found
 * @throws {NotFoundError} If recipe with the specified ID is not found
 */
router.get('/recipes/:recipeId', getRecipeById_controller as RequestHandler);

/**
 * @route POST /api/v1/recipes
 * @desc Create a new recipe
 * @param {Object} requestBody - Recipe object to create
 * @param {string} requestBody.name - Name of the recipe (required)
 * @returns {Object} Created recipe object with generated ID
 * @throws {ValidationError} If required fields are missing
 */
router.post('/recipes', createRecipe as RequestHandler);

export default router;
