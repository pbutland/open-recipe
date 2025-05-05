import React, { useContext, useCallback, useState } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import styled from 'styled-components';
import RecipeContext from '../../../context/RecipeContext';
import SimpleTextInput from '../form/SimpleTextInput';
import { toSentenceCase } from '../../../utils/utils';
import IngredientSection from './IngredientSection';
import ExpandableCard from '../../common/ExpandableCard';

const StyledStack = styled(Stack)`
  && {
    margin: 10px;
  }
`;

const IngredientGroupSection: React.FC<{ name: string, openApiComponents: any }> = ({ name, openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined) {
      const ingredientsGroups = recipe.ingredientsGroups ?? [];

      ingredientsGroups[index] = {
        ...ingredientsGroups[index],
        [field]: value.length === 0 ? undefined : value,
      }

      setRecipe({
        ...recipe,
        ingredientsGroups: ingredientsGroups
      });
    }
  }, [recipe]);


  const deleteComponent = (index: number) => {
  };

  const addComponent = () => {
    const index = components.length;
    const id = `recipe-indredientGroup-title-${index}`;
    const titleComponent = <StyledStack direction="row" spacing={2}><FormControl fullWidth><SimpleTextInput id={id} name='title' type='string' changeHandler={handleChange} index={index} /></FormControl></StyledStack>;
    const ingredientsSection = <IngredientSection name='ingredient' openApiComponents={openApiComponents} parentIndex={components.length} />

    const deleteButton = undefined;//<Button color="error" variant="contained" onClick={() => deleteComponent(setIngredientGroups.length)}>Delete {setIngredientGroups.length}</Button>;
    const newComponent = <div>{titleComponent}{ingredientsSection}{deleteButton}</div>;

    const existingIngredientGroups = recipe.ingredientsGroups !== undefined ? recipe.ingredientsGroups : [];
    existingIngredientGroups.push({ ingredients: [] });
    setRecipe({
      ...recipe,
      ingredientsGroups: existingIngredientGroups,
    });
    setComponents([...components, newComponent]);
  };

  return (
    <ExpandableCard id='ingredient-groups' title='Ingredient Groups'>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      <Button id="recipe-add-ingredientGroup" variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </ExpandableCard>
  );
};

export default IngredientGroupSection;