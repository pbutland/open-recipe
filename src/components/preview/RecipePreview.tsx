import React, { useContext } from 'react';
import { Box, Paper } from '@mui/material';
import styled from 'styled-components';
import RecipeContext from '../../context/RecipeContext';
import Title from './sections/Title';
import Description from './sections/Description';
import GeneralInfo, { GeneralInfoProps } from './sections/GeneralInfo';
import Instructions from './sections/Instructions';
import Conversion from './sections/Conversion';
import Notes from './sections/Notes';
import NutritionInfoList from './sections/NutritionInfoList';
import ImageCarousel from './sections/ImageCarousel';
import IngredientGroup from './sections/IngredientGroup';
import ConversionProvider from '../../context/ConversionProvider';
import ShoppingList from './sections/ShoppingList';

const StyledBox = styled(Box)`
  && {
    height: calc(100vh - 80px);
    overflow: auto;
  }
`;

const RecipePreview: React.FC = () => {
  const { recipe } = useContext(RecipeContext);

  const generalInfo: GeneralInfoProps = {
    tags: recipe.tags,
    creator: recipe.creator,
    source: recipe.source,
    sourceUrl: recipe.sourceUrl,
    datePublished: recipe.datePublished,
    dateModified: recipe.dateModified,
    license: recipe.license,
    complexity: recipe.complexity,
    type: recipe.type,
    cuisine: recipe.cuisine,
    duration: recipe.duration,
  };

  return (
    <StyledBox>
      <Paper elevation={2} style={{ height: '100%', overflowY: 'auto' }}>
        <div className="recipe-detail" style={{ padding: "10px" }}>
          <Title title={recipe.name} />
          <Description description={recipe.description} />
          <ImageCarousel imageUrls={recipe.imageUrls} />
          <GeneralInfo generalInfo={generalInfo} />
          <ConversionProvider>
            <Conversion servings={recipe.servings} />
            <IngredientGroup ingredientsGroup={recipe.ingredientsGroups} />
            <Instructions instructions={recipe.instructions} />
            <Notes notes={recipe.notes} />
            <NutritionInfoList info={recipe.nutritionInfoPerServe} />
            <ShoppingList ingredients={recipe.ingredientsGroups?.flatMap(group => group.ingredients)} />
          </ConversionProvider>
        </div>
      </Paper>
    </StyledBox>
  );
};

export default RecipePreview;
