import React, { useCallback, useContext, useState } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import styled from 'styled-components';
import Instruction from '../../../types/Instruction';
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

const InstructionGroupSection: React.FC<{ name: string, openApiComponents: any }> = ({ name, openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined) {
      instructions[index] = {
        ...instructions[index],
        [field]: value.length === 0 ? undefined : isNaN(Number(value)) ? value : Number(value)
      }
      setInstructions(instructions);
    }
    setRecipe({
      ...recipe,
      instructions: instructions
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
    <ExpandableCard id='instructions' title='Instructions'>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      <Button id='recipe-add-instruction' variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </ExpandableCard>
  );
};

export default InstructionGroupSection;