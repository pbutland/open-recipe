import React, { useCallback, useContext } from 'react';
import { Stack } from '@mui/material';
import styled from 'styled-components';
import RecipeContext from '../../../context/RecipeContext';
import FormComponentBuilder from '../form/FormComponentBuilder';
import DurationSection from './DurationSection';
import ImagesSection from './ImagesSection';
import ExpandableCard from '../../common/ExpandableCard';

const StyledStack = styled(Stack)`
  && {
    margin: 10px;
    width: calc(100% - 20px); // Adjust width to account for padding
  }
`;

const sectionProperties: string[] = [
  "id",
  "name",
  "imageUrls",
  "description",
  "creator",
  "license",
  "source",
  "sourceUrl",
  "datePublished",
  "dateModified",
  "servings",
  "duration",
  "complexity",
  "type",
  "cuisine",
  "tags"
];

const GeneralInfo: React.FC<{ openApiComponents: any }> = ({ openApiComponents }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);

  const handleTextChange = useCallback((field: string, value: string) => {
    setRecipe({
      ...recipe,
      [field]: value?.length === 0 ? undefined : isNaN(Number(value)) ? value : Number(value)
    });
  }, [recipe]);

  const formComponents = openApiComponents ? Object.entries(openApiComponents.components.schemas.Recipe.properties).map(([key, value]) => {
    if (!sectionProperties.includes(key)) {
      return null;
    }

    if (key === 'duration') {
      return (
        <DurationSection name={key} openApiComponents={openApiComponents} />
      );
    } else if (key === 'imageUrls') {
      return (
        <ImagesSection name={key} openApiComponents={openApiComponents} />
      );
    } else {
      return (
        <FormComponentBuilder name={key} value={value} openApiComponents={openApiComponents} changeHandler={handleTextChange} />
      );
    }
  }).filter(item => item !== null) : null;

  return (
    <ExpandableCard id='general-info' title='General Information'>
      <StyledStack spacing={2}>
        {formComponents}
      </StyledStack>
    </ExpandableCard>
  );
};

export default GeneralInfo;