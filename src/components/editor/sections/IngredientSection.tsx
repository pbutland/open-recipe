import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, FormControl, Stack } from '@mui/material';
import styled from 'styled-components';
import RecipeContext from '../../../context/RecipeContext';
import FormComponentBuilder from '../form/FormComponentBuilder';
import SimpleTextInput from '../form/SimpleTextInput';
import { toSentenceCase } from '../../../utils/utils';
import { propertyNameToEntityName } from '../../../utils/utils';
import ProductSection from './ProductSection';
import ExpandableCard from '../../common/ExpandableCard';

const StyledStack = styled(Stack)`
  && {
    margin: 10px; // Add padding here
  }
`;

const IngredientSection: React.FC<{ name: string, openApiComponents: any, parentIndex: number }> = ({ name, openApiComponents, parentIndex }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined && parentIndex !== undefined) {
      const ingredientGroups = recipe.ingredientsGroups ?? [];

      if (ingredientGroups[parentIndex].ingredients === undefined) {
        ingredientGroups[parentIndex] = {
          ...ingredientGroups[parentIndex],
          ingredients: []
        }
      }

      const typeOfValue = openApiComponents.components.schemas[propertyNameToEntityName('Ingredient')].properties[field].type;
      ingredientGroups[parentIndex].ingredients[index] = {
        ...ingredientGroups[parentIndex].ingredients[index],
        [field]: (typeOfValue === 'integer' || typeOfValue === 'number') ? Number(value) : typeOfValue === 'boolean' ? (value === 'true') : value.length !==0 ? value : undefined,
      }

      setRecipe({
        ...recipe,
        ingredientsGroups: ingredientGroups
      });
    }
  }, [recipe]);

  const deleteComponent = (index: number) => {
  };

  const addComponent = () => {
    const index = components.length;
    const basicFormComponents = openApiComponents ? Object.entries(openApiComponents.components.schemas[propertyNameToEntityName(name)].properties).map(([key, value]) => {
      if (key === 'product' || key === 'note') {
        return null;
      }
      const id = `recipe-${name}-${key}-${parentIndex}-${index}`;
      return (
        <FormControl fullWidth>
          <FormComponentBuilder id={id} key={key} name={key} value={value} openApiComponents={openApiComponents} changeHandler={handleChange} index={components.length} />
        </FormControl>
      );
    }).filter(item => item !== null) : null;

    const productFormComponents = <ProductSection openApiComponents={openApiComponents} index={components.length} parentIndex={parentIndex}/>;
    const id = `recipe-ingredient-note-${parentIndex}-${index}`;
    const noteSection = <StyledStack direction="row" spacing={2}><FormControl fullWidth><SimpleTextInput id={id} name='note' type='string' changeHandler={handleChange} index={components.length} /></FormControl></StyledStack>;

    const deleteButton = undefined;//<Button color="error" variant="contained" onClick={() => deleteComponent(components.length)}>Delete {components.length}</Button>;
    const newComponent = <div><StyledStack direction="column" spacing={2}>{productFormComponents}</StyledStack><StyledStack direction="row" spacing={2}>{basicFormComponents}{deleteButton}</StyledStack>{noteSection}</div>;
    setComponents([...components, newComponent]);
  };

  const id = `recipe-add-ingredient-${parentIndex}`;
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {components.map((component, index) => {
          const title = recipe.ingredientsGroups?.length && recipe.ingredientsGroups[parentIndex].ingredients?.length > index ? recipe.ingredientsGroups[parentIndex].ingredients[index].product.name : `Ingredient ${index+1}`;
          return (
          <ExpandableCard id={`ingredients-${index}`} title={title}>
            <React.Fragment key={index}>{component}</React.Fragment>
          </ExpandableCard>
          );
        })}
      </Box>
      <Button id={id} variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </div>
  );
};

export default IngredientSection;