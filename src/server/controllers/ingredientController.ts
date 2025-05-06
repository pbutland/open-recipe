import { Request, Response, NextFunction } from 'express';
import { getRecipeIngredients, getAllProducts } from '../utils/recipeUtils';
import { ValidationError } from '../utils/errorUtils';

/**
 * Get all ingredients from a specific recipe
 */
export const getIngredientsByRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { recipeId } = req.params;
    
    if (!recipeId) {
      throw new ValidationError('Recipe ID is required');
    }
    
    const ingredients = await getRecipeIngredients(recipeId);
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all shopping items (unique products across all recipes)
 */
export const getShoppingItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};
