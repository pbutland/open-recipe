import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, FormControl } from '@mui/material';
import styled from 'styled-components';
import Note from '../../../types/Note';
import RecipeContext from '../../../context/RecipeContext';
import SimpleTextInput from '../form/SimpleTextInput';
import { toSentenceCase } from '../../../utils/utils';
import { propertyNameToEntityName } from '../../../utils/utils';
import ExpandableCard from '../../common/ExpandableCard';

const StyledBox = styled(Box)`
  && {
    margin: 10px;
  }
`;

const NoteSection: React.FC<{ name: string, openApiComponents: any }> = ({ name, openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined) {
      notes[index] = {
        ...notes[index],
        text: value,
        index: index+1,
      }
      setNotes(notes);
    }
    setRecipe({
      ...recipe,
      notes: notes
    });
  }, [recipe]);

  const deleteComponent = (index: number) => {
  };

  const addComponent = () => {
    const id = `recipe-note-text-${components.length}`;
    const textComponent = <FormControl fullWidth><SimpleTextInput id={id} name='text' type='string' changeHandler={handleChange} index={components.length} /></FormControl>;
    const deleteButton = undefined;//<Button color="error" variant="contained" onClick={() => deleteComponent(components.length)}>Delete {components.length}</Button>;
    const newComponent = <li><StyledBox>{textComponent}{deleteButton}</StyledBox></li>;
    setComponents([...components, newComponent]);
  };

  return (
    <ExpandableCard id='notes' title='Notes'>
      <ol>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      </ol>
      <Button id="recipe-add-note" variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </ExpandableCard>
  );
};

export default NoteSection;