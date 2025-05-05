import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import Ingredient from '../../../types/Ingredient';
import { Measurement, convertAndGetUnit } from '../../../utils/conversionUtils';
import ConversionContext from '../../../context/ConversionContext';
import RecipeContext from '../../../context/RecipeContext';

interface ConvertedIngredient {
  name: string,
  convertedValue: Measurement,
  convertedUnitMeasurement: Measurement,
}

const ShoppingList: React.FC<{ ingredients: Ingredient[] | undefined }> = ({ ingredients }) => {
  const { recipe } = useContext(RecipeContext);
  const { measurementType, servings } = useContext(ConversionContext);

  const servingsRatio = servings / (recipe.servings ?? 1);
  const mappedIngredients = ingredients ? ingredients.filter(item => !!item).map((ingredient) => {
    const convertedValue = ingredient.quantity ? convertAndGetUnit(measurementType, ingredient.quantity, ingredient.unit, ingredient.product?.cupEquivalent) : { value: 0 };
    const convertedUnitMeasurement = ingredient.product?.unitMeasurement ? convertAndGetUnit(measurementType, ingredient.product.unitMeasurement, ingredient.product.measurementUnit, ingredient.product.cupEquivalent,) : { value: 0 };

    return {
      name: ingredient.product.name ? ingredient.product.name : '',
      convertedValue: convertedValue,
      convertedUnitMeasurement: convertedUnitMeasurement,
    }
  }).filter(item => !!item) : [];

  const dedupeAndSum = (ingredients: ConvertedIngredient[]): ConvertedIngredient[] => {
    return ingredients.reduce((acc, current) => {
      const existingItem = acc.find(item => item.name === current.name);

      if (existingItem) {
        // TODO this needs to take into account the unit too (e.g. one might be ml and the other might be l)
        existingItem.convertedValue.value += current.convertedValue?.value ?? 0;
        existingItem.convertedUnitMeasurement.value += current.convertedUnitMeasurement?.value ?? 0;
      } else {
        acc.push({ ...current });
      }

      return acc;
    }, [] as ConvertedIngredient[]);
  };

  const items = dedupeAndSum(mappedIngredients).map(item => {
    return `${item.convertedValue.value !== 0 ? item.convertedValue.value * servingsRatio : ''} ${item.convertedValue?.unit ?? ''}${item.convertedUnitMeasurement.value !== 0 ? ` ${item.convertedUnitMeasurement.value}` : ''}${item.convertedUnitMeasurement.unit ? ` ${item.convertedUnitMeasurement.unit}` : ''} ${item.name ?? ''}`;
  });

  return (
    <div>
      {items !== undefined && items.length > 0 && (
        <Typography id="preview-recipe-shopping-list-title" variant="h5" color="primary">
          Shopping List
        </Typography>
      )}
      {items?.map((item, i) => (
        <Typography variant="body1" color="primary">
          <li key={i}>
            {item}
          </li>
        </Typography>
      ))}
    </div>
  );
};

export default ShoppingList;
