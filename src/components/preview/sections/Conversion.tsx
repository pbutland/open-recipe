import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import ConversionContext from '../../../context/ConversionContext';
import { MeasurementType } from '../../../utils/conversionUtils';
import { toSentenceCase } from '../../../utils/utils';
import RecipeContext from '../../../context/RecipeContext';

const StyledStack = styled(Stack)`
  && {
    margin: 20px;
    width: calc(100% - 20px); // Adjust width to account for padding
  }
`;

const Conversion: React.FC<{ servings: number | undefined }> = ({ servings }) => {
  const { recipe } = useContext(RecipeContext);
  const { setServings, setMeasurementType } = useContext(ConversionContext);
  const [displayedServings, setDisplayedServings] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState('metric');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMetric(event.target.value);
    switch (event.target.value) {
      case 'metric':
        setMeasurementType(MeasurementType.metric);
        break;
      case 'imperial':
        setMeasurementType(MeasurementType.imperial);
        break;
      case 'cup':
        setMeasurementType(MeasurementType.cup);
        break;
    }
  };

  const disableCup = recipe['ingredientsGroups']?.flatMap(group => group.ingredients).filter(ingredient => ingredient !== undefined).flatMap(ingredient => ingredient.product).every(product => product === undefined || product.cupEquivalent === undefined);

  useEffect(() => {
    if (servings !== undefined) {
      setDisplayedServings(servings);
      setServings(servings);
    }
  }, [servings]);

  const handleClick = (incr: number) => {
    setServings(displayedServings + incr);
    setDisplayedServings(displayedServings + incr);
  };

  return (
    <div>
      {servings !== undefined && (
        <div>
          <Typography id="preview-recipe-conversions-title" variant="h5" color="primary">
            Conversions
          </Typography>
          <Stack justifyContent="center" direction="row" spacing={2}>
            <Button variant="contained" onClick={() => handleClick(-1)}>-</Button>
            <Typography variant="subtitle1" color="textSecondary">
              Servings
            </Typography>
            <Typography variant="body1" color="primary">
              {displayedServings}
            </Typography>
            <Button variant="contained" onClick={() => handleClick(1)}>+</Button>
          </Stack>
          <StyledStack>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <RadioGroup
                aria-label="demo"
                defaultValue="json"
                name="controlled-radio-buttons-group"
                value={selectedMetric}
                onChange={handleChange}
                row
              >
                <FormControlLabel value='metric' control={<Radio />} label={toSentenceCase(MeasurementType.metric)} />
                <FormControlLabel value='imperial' control={<Radio />} label={toSentenceCase(MeasurementType.imperial)} />
                <FormControlLabel disabled={disableCup} value='cup' control={<Radio />} label={toSentenceCase(MeasurementType.cup)} />
              </RadioGroup>
            </div>
          </StyledStack>
        </div>
      )}
      <Divider />
    </div>
  );
};

export default Conversion;