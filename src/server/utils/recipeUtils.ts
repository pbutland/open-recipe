import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Recipe from '../../types/Recipe';
import { NotFoundError, ServerError } from './errorUtils';
import { RecipeTag } from '../../types/api';

// Path to the recipes directory
const RECIPES_DIR = path.join(__dirname, '../../../recipes');

// Default pagination settings
export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;

/**
 * Pagination result interface
 */
export interface PaginatedResult<T> {
  data: T[];
  meta: {
    totalItems: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

/**
 * Interface for recipe summary data
 */
export interface RecipeSummary {
  id: string;
  name: string;
  description?: string;
  complexity?: string;
  type?: string;
  cuisine?: string;
  tags?: string[];
  imageUrls?: string[];
}

/**
 * Read all recipe files from the recipes directory
 */
export const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const files = fs.readdirSync(RECIPES_DIR);
    const recipeFiles = files.filter(file => file.endsWith('.json'));
    
    const recipes: Recipe[] = [];
    for (const file of recipeFiles) {
      const filePath = path.join(RECIPES_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      recipes.push(JSON.parse(fileContent));
    }
    
    return recipes;
  } catch (error) {
    console.error('Error reading recipe files:', error);
    throw new ServerError('Failed to read recipe files', { cause: error });
  }
};

/**
 * Get a recipe by ID
 */
export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const recipes = await getAllRecipes();
    const recipe = recipes.find(recipe => recipe.id === id);
    
    if (!recipe) {
      throw new NotFoundError(`Recipe with ID ${id} not found`);
    }
    
    return recipe;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error getting recipe by ID:', error);
    throw new ServerError(`Failed to get recipe with ID ${id}`, { cause: error });
  }
};

/**
 * Filter recipes based on query parameters with pagination
 */
export const filterRecipes = async (filters: {
  name?: string;
  tags?: string[];
  type?: string;
  cuisine?: string;
  complexity?: string;
  servings?: number;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResult<Recipe>> => {
  try {
    // Apply pagination parameters with defaults and limits
    const limit = Math.min(filters.limit || DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT);
    const offset = filters.offset || 0;
    
    // Get all recipes
    let recipes = await getAllRecipes();
    
    // Apply filters
    if (filters.name) {
      const nameFilter = filters.name.toLowerCase();
      recipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(nameFilter) ||
        (recipe.description && recipe.description.toLowerCase().includes(nameFilter))
      );
    }
    
    if (filters.tags && filters.tags.length > 0) {
      recipes = recipes.filter(recipe => 
        recipe.tags && filters.tags!.some(tag => 
          recipe.tags!.includes(tag as any) // Cast to any to bypass strict type checking
        )
      );
    }
    
    if (filters.type) {
      recipes = recipes.filter(recipe => recipe.type === filters.type);
    }
    
    if (filters.cuisine) {
      recipes = recipes.filter(recipe => recipe.cuisine === filters.cuisine);
    }
    
    if (filters.complexity) {
      recipes = recipes.filter(recipe => recipe.complexity === filters.complexity);
    }
    
    if (filters.servings) {
      recipes = recipes.filter(recipe => recipe.servings === filters.servings);
    }
    
    // Calculate total before pagination
    const totalItems = recipes.length;
    
    // Apply pagination
    const paginatedRecipes = recipes.slice(offset, offset + limit);
    
    // Return paginated result
    return {
      data: paginatedRecipes,
      meta: {
        totalItems,
        limit,
        offset, 
        hasMore: offset + limit < totalItems
      }
    };
  } catch (error) {
    console.error('Error filtering recipes:', error);
    throw new ServerError('Failed to filter recipes', { cause: error });
  }
};

/**
 * Get recipe summaries with pagination and filtering
 */
export const getRecipeSummaries = async (filters: {
  name?: string;
  tags?: string[];
  type?: string;
  cuisine?: string;
  complexity?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResult<RecipeSummary>> => {
  try {
    // Get filtered recipes using the existing filterRecipes function
    const recipesResult = await filterRecipes(filters);
    
    // Extract only the summary fields from each recipe
    const summaries: RecipeSummary[] = recipesResult.data.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      complexity: recipe.complexity,
      type: recipe.type,
      cuisine: recipe.cuisine,
      tags: recipe.tags,
      imageUrls: recipe.imageUrls
    }));
    
    // Return paginated result with the same metadata
    return {
      data: summaries,
      meta: recipesResult.meta
    };
  } catch (error) {
    console.error('Error getting recipe summaries:', error);
    throw new ServerError('Failed to get recipe summaries', { cause: error });
  }
};

/**
 * Save a new recipe to a JSON file
 */
export const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
  try {
    // Ensure recipe has an ID
    if (!recipe.id) {
      recipe.id = uuidv4();
    }
    
    const fileName = `${recipe.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    const filePath = path.join(RECIPES_DIR, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2), 'utf8');
    return recipe;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw new ServerError('Failed to save recipe', { cause: error });
  }
};

/**
 * Get all ingredients from a specific recipe
 */
export const getRecipeIngredients = async (recipeId: string) => {
  try {
    const recipe = await getRecipeById(recipeId);
    
    if (!recipe.ingredientsGroups) {
      return [];
    }
    
    // Flatten all ingredients from ingredient groups
    const allIngredients = recipe.ingredientsGroups.flatMap(group => group.ingredients || []);
    return allIngredients;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error getting recipe ingredients:', error);
    throw new ServerError(`Failed to get ingredients for recipe ID ${recipeId}`, { cause: error });
  }
};

/**
 * Extract all unique products from all recipes (for shopping list)
 */
export const getAllProducts = async () => {
  try {
    const recipes = await getAllRecipes();
    const productsMap = new Map();
    
    recipes.forEach(recipe => {
      if (recipe.ingredientsGroups) {
        recipe.ingredientsGroups.forEach(group => {
          if (group.ingredients) {
            group.ingredients.forEach(ingredient => {
              if (ingredient.product && ingredient.product.id) {
                productsMap.set(ingredient.product.id, ingredient.product);
              }
            });
          }
        });
      }
    });
    
    return Array.from(productsMap.values());
  } catch (error) {
    console.error('Error getting all products:', error);
    throw new ServerError('Failed to get all products', { cause: error });
  }
};
