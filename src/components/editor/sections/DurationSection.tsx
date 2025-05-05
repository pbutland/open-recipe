import React, { useCallback, useContext, useState } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import styled from 'styled-components';
import Duration from '../../../types/Duration';
import RecipeContext from '../../../context/RecipeContext';
import FormComponentBuilder from '../form/FormComponentBuilder';
import { toSentenceCase } from '../../../utils/utils';
import { propertyNameToEntityName } from '../../../utils/utils';

const StyledStack = styled(Stack)`
  && {
    margin-bottom: 10px; // Add padding here
  }
`;

const DurationSection: React.FC<{ name: string, openApiComponents: any }> = ({ name, openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [durations, setDurations] = useState<Duration[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined) {
      durations[index] = {
        ...durations[index],
        [field]: value.length === 0 ? undefined : isNaN(Number(value)) ? value : Number(value)
      }
      setDurations(durations);
    }
    setRecipe({
      ...recipe,
      duration: durations
    });
  }, [recipe]);

  const deleteComponent = (index: number) => {
    const newComponents = components.filter((_, i) => i !== index);
    setComponents(newComponents);
    durations.splice(index, 1);
    setRecipe({
      ...recipe,
      duration: durations
    });
  };

  const addComponent = () => {
    const formComponents = openApiComponents ? Object.entries(openApiComponents.components.schemas[propertyNameToEntityName(name)].properties).map(([key, value]) => {
      return (
        <FormControl fullWidth>
          <FormComponentBuilder key={key} name={key} value={value} openApiComponents={openApiComponents} changeHandler={handleChange} index={components.length} />
        </FormControl>
      );
    }).filter(item => item !== undefined) : null;

    const deleteButton = undefined;//<Button color="error" variant="contained" onClick={() => deleteComponent(components.length)}>Delete {components.length}</Button>;
    const newComponent = <div><StyledStack direction="row" spacing={2}>{formComponents}{deleteButton}</StyledStack></div>;
    setComponents([...components, newComponent]);
  };

  return (
    <div>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      <Button id='recipe-add-duration' variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </div>
  );
};

export default DurationSection;