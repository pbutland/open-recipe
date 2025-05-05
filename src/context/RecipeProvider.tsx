import { v4 as uuidv4 } from 'uuid';
import React, { PropsWithChildren, useState } from 'react';
import RecipeContext, { RecipeContextType } from './RecipeContext';

const RecipeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [recipe, setRecipe] = useState({ id: uuidv4(), name: '' });

  const value: RecipeContextType = {
    recipe,
    setRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
