import { Request, Response, NextFunction } from 'express';
import { 
  getAllRecipes, 
  getRecipeById, 
  filterRecipes,
  saveRecipe,
  DEFAULT_PAGE_LIMIT,
  getRecipeSummaries
} from '../utils/recipeUtils';
import { ValidationError } from '../utils/errorUtils';

/**
 * Helper to create pagination links for HATEOAS
 */
const createPaginationLinks = (req: Request, totalItems: number, limit: number, offset: number) => {
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const query = {...req.query};
  
  const links: Record<string, string> = {};
  
  // Self link (current page)
  links.self = `${baseUrl}?${new URLSearchParams({
    ...query,
    limit: limit.toString(),
    offset: offset.toString()
  } as any).toString()}`;
  
  // First page
  links.first = `${baseUrl}?${new URLSearchParams({
    ...query,
    limit: limit.toString(),
    offset: '0'
  } as any).toString()}`;
  
  // Previous page (if not on first page)
  if (offset > 0) {
    const prevOffset = Math.max(offset - limit, 0);
    links.prev = `${baseUrl}?${new URLSearchParams({
      ...query,
      limit: limit.toString(),
      offset: prevOffset.toString()
    } as any).toString()}`;
  }
  
  // Next page (if more items exist)
  if (offset + limit < totalItems) {
    const nextOffset = offset + limit;
    links.next = `${baseUrl}?${new URLSearchParams({
      ...query,
      limit: limit.toString(),
      offset: nextOffset.toString()
    } as any).toString()}`;
  }
  
  return links;
};

/**
 * Get all recipes or filter based on query parameters
 */
export const getRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      name, tags, type, cuisine, complexity, servings,
      limit: limitParam, offset: offsetParam
    } = req.query;
    
    // Parse pagination parameters
    let limit = DEFAULT_PAGE_LIMIT;
    if (limitParam) {
      const parsedLimit = parseInt(limitParam.toString());
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        limit = parsedLimit;
      }
    }
    
    let offset = 0;
    if (offsetParam) {
      const parsedOffset = parseInt(offsetParam.toString());
      if (!isNaN(parsedOffset) && parsedOffset >= 0) {
        offset = parsedOffset;
      }
    }
    
    // Build filter object
    const filters: any = {
      limit,
      offset
    };
    
    if (name) filters.name = name.toString();
    if (type) filters.type = type.toString();
    if (cuisine) filters.cuisine = cuisine.toString();
    if (complexity) filters.complexity = complexity.toString();
    
    if (tags) {
      filters.tags = Array.isArray(tags) 
        ? tags.map(tag => tag.toString())
        : [tags.toString()];
    }
    
    if (servings) {
      const servingsNum = parseInt(servings.toString());
      if (!isNaN(servingsNum)) {
        filters.servings = servingsNum;
      }
    }
    
    // Get paginated and filtered recipes
    const result = await filterRecipes(filters);
    
    // Generate HATEOAS links
    const links = createPaginationLinks(
      req, 
      result.meta.totalItems,
      result.meta.limit,
      result.meta.offset
    );
    
    // Send response instead of returning it
    res.json({
      data: result.data,
      _meta: result.meta,
      _links: links
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific recipe by ID
 */
export const getRecipeById_controller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { recipeId } = req.params;
    
    if (!recipeId) {
      throw new ValidationError('Recipe ID is required');
    }
    
    const recipe = await getRecipeById(recipeId);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new recipe
 */
export const createRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const recipeData = req.body;
    
    // Basic validation
    if (!recipeData.name) {
      throw new ValidationError('Recipe name is required');
    }
    
    const savedRecipe = await saveRecipe(recipeData);
    res.status(201).json(savedRecipe);
  } catch (error) {
    next(error);
  }
};

/**
 * Get recipe summaries with essential information (lighter version of recipes)
 */
export const getRecipeSummaries_controller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      name, tags, type, cuisine, complexity,
      limit: limitParam, offset: offsetParam
    } = req.query;
    
    // Parse pagination parameters
    let limit = DEFAULT_PAGE_LIMIT;
    if (limitParam) {
      const parsedLimit = parseInt(limitParam.toString());
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        limit = parsedLimit;
      }
    }
    
    let offset = 0;
    if (offsetParam) {
      const parsedOffset = parseInt(offsetParam.toString());
      if (!isNaN(parsedOffset) && parsedOffset >= 0) {
        offset = parsedOffset;
      }
    }
    
    // Build filter object
    const filters: any = {
      limit,
      offset
    };
    
    if (name) filters.name = name.toString();
    if (type) filters.type = type.toString();
    if (cuisine) filters.cuisine = cuisine.toString();
    if (complexity) filters.complexity = complexity.toString();
    
    if (tags) {
      filters.tags = Array.isArray(tags) 
        ? tags.map(tag => tag.toString())
        : [tags.toString()];
    }
    
    // Get paginated and filtered recipe summaries
    const result = await getRecipeSummaries(filters);
    
    // Generate HATEOAS links
    const links = createPaginationLinks(
      req, 
      result.meta.totalItems,
      result.meta.limit,
      result.meta.offset
    );
    
    // Send response
    res.json({
      data: result.data,
      _meta: result.meta,
      _links: links
    });
  } catch (error) {
    next(error);
  }
};
