import React, { useCallback, useContext } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import RecipeContext from '../../../context/RecipeContext';
import { toSentenceCase } from '../../../utils/utils';
import { OpenApiNumber, OpenApiObject } from '../../../types/openapi';

const StyledTextField = styled(TextField)`
  && {
    width: 100%
  }
`;

const SimpleTextInput: React.FC<{ name: string, type: string, entity?: OpenApiObject, changeHandler?: (field: string, value: string, index?: number) => void, index?: number, id?: string }> = ({ name, type, entity, changeHandler, index, id }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);

  const handleTextChange = useCallback((value: string) => {
    setRecipe({
      ...recipe,
      [name]: value?.length === 0 ? undefined : isNaN(Number(value)) ? value : Number(value)
    });
  }, [recipe]);

  const entityAsNumber = entity as OpenApiNumber;
  const minValue = entityAsNumber?.minimum !== undefined ? entityAsNumber.minimum : undefined;
  const maxValue = entityAsNumber?.maximum !== undefined ? entityAsNumber.maximum : undefined;

  const inputProps = type === 'integer' ? { inputProps: { min: minValue, max: maxValue } } : {};

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { changeHandler ? changeHandler(name, event.target.value, index) : handleTextChange(event.target.value) };

  const idSuffix = index !== undefined ? `-${index}` : '';
  id = id ?? `recipe-${name}${idSuffix}`;

  return (
    <StyledTextField
      id={id}
      key={name}
      label={toSentenceCase(name)}
      variant='outlined'
      type={type === 'string' ? 'text' : 'number'}
      InputProps={inputProps}
      onChange={onChange}
    />
  );
};

export default SimpleTextInput;