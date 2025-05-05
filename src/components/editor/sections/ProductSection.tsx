import { v4 as uuidv4 } from 'uuid';
import React, { useCallback, useContext, useState } from 'react';
import { FormControl, Stack } from '@mui/material';
import RecipeContext from '../../../context/RecipeContext';
import FormComponentBuilder from '../form/FormComponentBuilder';
import Product from '../../../types/Product';

const ProductSection: React.FC<{ openApiComponents: any, parentIndex: number, index: number }> = ({ openApiComponents, parentIndex, index }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [product, setProduct] = useState<Product>({ id: uuidv4(), name: '' });

  const handleChange = useCallback((field: string, value: string) => {
    if (index !== undefined && parentIndex !== undefined) {
      const ingredientGroups = recipe.ingredientsGroups ?? [];
      const newProduct = {
        ...product,
        [field]: value.length === 0 ? undefined : isNaN(Number(value)) ? value : Number(value),
      }
      setProduct(newProduct);

      if (ingredientGroups[parentIndex].ingredients === undefined) {
        ingredientGroups[parentIndex] = {
          ...ingredientGroups[parentIndex],
          ingredients: []
        }
      }

      ingredientGroups[parentIndex].ingredients[index] = {
        ...ingredientGroups[parentIndex].ingredients[index],
        product: newProduct
      }

      setRecipe({
        ...recipe,
        ingredientsGroups: ingredientGroups,
      });
    }
  }, [recipe]);

  const deleteComponent = (index: number) => {
  };

  const formComponents = openApiComponents ? Object.entries(openApiComponents.components.schemas['Product'].properties).map(([key, value]) => {
    if (key === 'product' || key === 'note') {
      return null;
    }
    const id = `recipe-ingredient-${key}-${parentIndex}-${index}`;
    return (
      <FormControl fullWidth>
        <FormComponentBuilder id={id} key={key} name={key} value={value} openApiComponents={openApiComponents} changeHandler={handleChange} />
      </FormControl>
    );
  }).filter(item => item !== null) : null;

  return (
    <div>
      <Stack spacing={2}>
        {formComponents}
      </Stack>
    </div>
  );
};

export default ProductSection;