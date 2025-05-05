import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, FormControl } from '@mui/material';
import styled from 'styled-components';
import Instruction from '../../../types/Instruction';
import RecipeContext from '../../../context/RecipeContext';
import SimpleTextInput from '../form/SimpleTextInput';
import { toSentenceCase } from '../../../utils/utils';
import ExpandableCard from '../../common/ExpandableCard';

const StyledBox = styled(Box)`
  && {
    margin: 10px;
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
        text: value,
        step: index+1,
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
    const id = `recipe-instruction-text-${components.length}`;
    const textComponent = <FormControl fullWidth><SimpleTextInput id={id} name='text' type='string' changeHandler={handleChange} index={components.length} /></FormControl>;
    const deleteButton = undefined;//<Button color="error" variant="contained" onClick={() => deleteComponent(components.length)}>Delete {components.length}</Button>;
    const newComponent = <li><StyledBox>{textComponent}{deleteButton}</StyledBox></li>;
    setComponents([...components, newComponent]);
  };

  return (
    <ExpandableCard id='instructions' title='Instructions'>
      <ol>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      </ol>
      <Button id='recipe-add-instruction' variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </ExpandableCard>
  );
};

export default InstructionGroupSection;
