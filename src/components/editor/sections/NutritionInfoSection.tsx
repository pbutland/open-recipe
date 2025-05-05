import React, { useCallback, useContext, useState } from 'react';
import { Button, FormControl, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import NutritionInfo from '../../../types/NutritionInfo';
import RecipeContext from '../../../context/RecipeContext';
import FormComponentBuilder from '../form/FormComponentBuilder';
import { toSentenceCase } from '../../../utils/utils';
import { propertyNameToEntityName } from '../../../utils/utils';
import ExpandableCard from '../../common/ExpandableCard';

const StyledStack = styled(Stack)`
  && {
    margin: 10px; // Add padding here
  }
`;

const NutritionInfoSection: React.FC<{ name: string, openApiComponents: any }> = ({ name, openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [nutritionInfoPerServe, setNutritionInfoPerServe] = useState<NutritionInfo[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined) {
      nutritionInfoPerServe[index] = {
        ...nutritionInfoPerServe[index],
        [field]: value.length === 0 ? undefined : isNaN(Number(value)) ? value : Number(value)
      }
      setNutritionInfoPerServe(nutritionInfoPerServe);
    }
    setRecipe({
      ...recipe,
      nutritionInfoPerServe: nutritionInfoPerServe
    });
  }, [recipe]);

  const deleteComponent = (index: number) => {
  };

  const addComponent = () => {
    const formComponents = openApiComponents ? Object.entries(openApiComponents.components.schemas[propertyNameToEntityName(name)].properties).map(([key, value]) => {
      const index = components.length;
      const id = `recipe-${name}-${key}-${index}`;
      return (
        <FormControl fullWidth>
          <FormComponentBuilder id={id} key={key} name={key} value={value} openApiComponents={openApiComponents} changeHandler={handleChange} index={index} />
        </FormControl>
      );
    }).filter(item => item !== undefined) : null;

    const deleteButton = undefined;//<Button color="error" variant="contained" onClick={() => deleteComponent(components.length)}>Delete {components.length}</Button>;
    const newComponent = <div><StyledStack direction="row" spacing={2}>{formComponents}{deleteButton}</StyledStack></div>;
    setComponents([...components, newComponent]);
  };

  return (
    <ExpandableCard id='nutrition-info' title='Nutritional Info Per Serve'>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      <Button id="recipe-add-nutritionInfo" variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </ExpandableCard>
  );
};

export default NutritionInfoSection;