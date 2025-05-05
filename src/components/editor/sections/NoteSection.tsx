import React, { useCallback, useContext, useState } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import styled from 'styled-components';
import Note from '../../../types/Note';
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

const NoteSection: React.FC<{ name: string, openApiComponents: any }> = ({ name, openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined) {
      notes[index] = {
        ...notes[index],
        [field]: value.length !== 0 ? value : undefined,
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
    <ExpandableCard id='notes' title='Notes'>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      <Button id="recipe-add-note" variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </ExpandableCard>
  );
};

export default NoteSection;