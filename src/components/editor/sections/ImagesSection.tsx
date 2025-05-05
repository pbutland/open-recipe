import React, { useCallback, useContext, useState } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import styled from 'styled-components';
import RecipeContext from '../../../context/RecipeContext';
import SimpleTextInput from '../form/SimpleTextInput';
import { toSentenceCase } from '../../../utils/utils';

const StyledStack = styled(Stack)`
  && {
    margin-bottom: 10px; // Add padding here
  }
`;

const ImagesSection: React.FC<{ name: string, openApiComponents: any }> = ({ name, openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleChange = useCallback((field: string, value: string, index?: number) => {
    if (index !== undefined) {
      images[index] = value;
      setImages(images);
    }
    setRecipe({
      ...recipe,
      imageUrls: images
    });
  }, [recipe]);

  const deleteComponent = (index: number) => {
  };

  const addComponent = () => {
    const id = `recipe-imageUrl-${components.length}`;
    const formComponents = <FormControl fullWidth><SimpleTextInput id={id} name='imageUrls' type='string' changeHandler={handleChange} index={images.length} /></FormControl>;

    const deleteButton = undefined;//<Button color="error" variant="contained" onClick={() => deleteComponent(components.length)}>Delete {components.length}</Button>;
    const newComponent = <div><StyledStack direction="row" spacing={2}>{formComponents}{deleteButton}</StyledStack></div>;
    setComponents([...components, newComponent]);
  };

  return (
    <div>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
      <Button id="recipe-add-image" variant="contained" onClick={addComponent}>Add {toSentenceCase(name)}</Button>
    </div>
  );
};

export default ImagesSection;