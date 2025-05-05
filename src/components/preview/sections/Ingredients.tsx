import React, { useContext } from 'react';
import { Divider, Typography } from '@mui/material';
import Ingredient from '../../../types/Ingredient';
import { convertAndGetUnit } from '../../../utils/conversionUtils';
import ConversionContext from '../../../context/ConversionContext';
import RecipeContext from '../../../context/RecipeContext';

const Ingredients: React.FC<{ ingredients: Ingredient[] | undefined }> = ({ ingredients }) => {
  const { recipe } = useContext(RecipeContext);
  const { measurementType, servings } = useContext(ConversionContext);

  const servingsRatio = servings / (recipe.servings ?? 1);
  const mappedIngredients = ingredients?.map((ingredient) => {
    const convertedValue = ingredient.quantity ? convertAndGetUnit(measurementType, ingredient.quantity, ingredient.unit, ingredient.product?.cupEquivalent) : undefined;
    const convertedUnitMeasurement = ingredient.product?.unitMeasurement ? convertAndGetUnit(measurementType, ingredient.product.unitMeasurement, ingredient.product.measurementUnit, ingredient.product.cupEquivalent,) : undefined;

    return `${convertedValue ? convertedValue.value * servingsRatio : ''} ${convertedValue?.unit ?? ''}${convertedUnitMeasurement ? ` ${convertedUnitMeasurement.value}` : ''}${convertedUnitMeasurement?.unit ? ` ${convertedUnitMeasurement.unit}` : ''} ${ingredient.product?.name ?? ''}${ingredient.note ? ` (${ingredient.note})` : ''}${ingredient.optional ? ' (optional)' : ''}`;
  });

  return (
    <div>
      {mappedIngredients?.map((item, i) => (
        <Typography variant="body1" color="primary" key={i}>
          <li>
            {item}
          </li>
        </Typography>
      ))}
      {ingredients && ingredients.length > 0 && (<Divider />)}
    </div>
  );
};

export default Ingredients;
