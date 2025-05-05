import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import styled from 'styled-components';
import yaml from 'js-yaml';
import GeneralInfo from './sections/GeneralInfo';
import IngredientGroupSection from './sections/IngredientGroupSection';
import InstructionSection from './sections/InstructionSection';
import NoteSection from './sections/NoteSection';
import NutritionInfoSection from './sections/NutritionInfoSection';

const StyledCard = styled(Box)`
  && {
    height: calc(100vh - 30px);
    overflow: auto;
  }
`;

const RecipeEditor: React.FC = () => {
  const [openApiComponents, setOpenApiComponents] = useState<any>(null);

  useEffect(() => {
    const fetchAndParseYaml = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const yamlText = await response.text();
        setOpenApiComponents(yaml.load(yamlText));
      } catch (error) {
        console.error('Error fetching or parsing YAML:', error);
        throw error;
      }
    };

    fetchAndParseYaml('https://raw.githubusercontent.com/pbutland/open-recipe/refs/heads/main/open-recipe.yaml');
  }, []);

  return (
    <div className="child-item">
      <Stack spacing={2}>
        <StyledCard>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <GeneralInfo openApiComponents={openApiComponents} />
            <IngredientGroupSection name="ingredientGroup" openApiComponents={openApiComponents} />
            <InstructionSection name="instruction" openApiComponents={openApiComponents} />
            <NoteSection name="note" openApiComponents={openApiComponents} />
            <NutritionInfoSection name="nutritionInfo" openApiComponents={openApiComponents} />
          </Box>
        </StyledCard>
      </Stack>
    </div>
  );
};

export default RecipeEditor;
