import React, { useCallback, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import RecipeContext from '../../../context/RecipeContext';
import { toSentenceCase } from '../../../utils/utils';

const SimpleSelect: React.FC<{ name: string, values: string[], index?: number, id?: string, changeHandler?: (field: string, value: string, index?: number) => void }> = ({ name, values, changeHandler, index, id }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);

  const handleTextChange = useCallback((field: string, value: string) => {
    setRecipe({
      ...recipe,
      [field]: value?.length === 0 ? undefined : isNaN(Number(value)) ? value : Number(value)
    });
  }, [recipe]);

  const menuItems = values.map(value => {
    return (
      <MenuItem key={value} value={value}>{toSentenceCase(value)}</MenuItem>
    );
  });

  const noneSelected = <MenuItem key='None' value={undefined}>None</MenuItem>
  menuItems.unshift(noneSelected);

  const onChange = (event: any) => { changeHandler ? changeHandler(name, event.target.value, index) : handleTextChange(name, event.target.value) };

  const idSuffix = index !== undefined ? `-${index}` : '';
  id = id ?? `recipe-${name}${idSuffix}`;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{toSentenceCase(name)}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={id}
        label={name}
        onChange={onChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
