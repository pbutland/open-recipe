import React, { useCallback, useContext, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import RecipeContext from '../../../context/RecipeContext';
import { toSentenceCase } from '../../../utils/utils';
import { OpenApiNumber, OpenApiObject } from '../../../types/openapi';

const SimpleBoolean: React.FC<{ name: string, type: string, entity?: OpenApiObject, index?: number, changeHandler?: (field: string, value: string, index?: number) => void }> = ({ name, type, entity, changeHandler, index }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = useCallback((value: boolean) => {
    setIsChecked(value);

    if (changeHandler) {
      changeHandler(name, value ? 'true' : 'false', index);
    } else {
      setRecipe({
        ...recipe,
        [name]: value
      });
    }
  }, [recipe]);

  const entityAsNumber = entity as OpenApiNumber;
  const minValue = entityAsNumber?.minimum !== undefined ? entityAsNumber.minimum : undefined;
  const maxValue = entityAsNumber?.maximum !== undefined ? entityAsNumber.maximum : undefined;

  const inputProps = type === 'integer' ? { inputProps: { min: minValue, max: maxValue } } : {};

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { changeHandler ? changeHandler(name, event.target.value, index) : handleChange(event.target.checked) };

  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChange(event.target.checked); }} />}
        label={toSentenceCase(name)}
      />
    </div>
  );
};

export default SimpleBoolean;