import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Recipe from '../types/Recipe';

interface RecipeState {
  recipe: Recipe;
}

interface RecipeActions {
  setRecipe: (data: Recipe) => void;
}

type RecipeContextType = RecipeState & RecipeActions;

const initialContextValue: RecipeContextType = {
  recipe: { id: uuidv4(), name: '' } as Recipe,
  setRecipe: () => { },
};

const RecipeContext = React.createContext<RecipeContextType>(initialContextValue);

export default RecipeContext;
export type { RecipeContextType };
