import React from 'react';
import { Divider, Typography } from '@mui/material';
import IngredientGroup from '../../../types/IngredientGroup';
import Ingredients from './Ingredients';

const IngredientsGroup: React.FC<{ ingredientsGroup?: IngredientGroup[] }> = ({ ingredientsGroup }) => {
  return (
    <div>
      {ingredientsGroup && ingredientsGroup.length > 0 && (
        <Typography id="preview-recipe-ingredientsGroup-title" variant="h5" color="primary">
          Ingredients
        </Typography>
      )}
      {ingredientsGroup?.map(ingredientsGroup => {
        return (
          <div>
            <Typography variant="h6" color="primary">
              {ingredientsGroup.title}
            </Typography>
            <Ingredients ingredients={ingredientsGroup.ingredients} />
          </div>
        );
      })}
      {ingredientsGroup && ingredientsGroup.length > 0 && (<Divider />)}
    </div>
  );
};

export default IngredientsGroup;
