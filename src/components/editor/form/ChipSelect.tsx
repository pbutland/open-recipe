import React, { useContext, useState } from 'react';
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from 'styled-components';
import RecipeContext from '../../../context/RecipeContext';
import { toSentenceCase } from '../../../utils/utils';

const StyledStack = styled(Stack)`
  && {
    padding-bottom: 20px;
  }
`;

interface Option {
  value: string;
  label: string;
}

const ChipSelect: React.FC<{ name: string, options: string[], index?: number }> = ({ name, options }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const { recipe, setRecipe } = useContext(RecipeContext);

  const optionValues = options.map(item => {
    return {
      value: item,
      label: toSentenceCase(item)
    }
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
  };

  // const handleAddClick = useCallback(() => {
  const handleAddClick = () => {
    if (selectedValue && !selectedItems.some(item => item.value === selectedValue)) {
      const items = [...selectedItems, { value: selectedValue, label: optionValues.find(opt => opt.value === selectedValue)?.label || '' }];
      setSelectedItems(items);
      setRecipe({
        ...recipe,
        [name]: items.map(item => item.value)
      });
    }
    setSelectedValue('');
  };
  // }, [recipe]);

  const handleDeleteClick = (value: string) => () => {
    const items = selectedItems.filter(item => item.value !== value);
    setSelectedItems(items);
    setRecipe({
      ...recipe,
      [name]: items.map(item => item.value)
    });
  };

  return (
    <div>
      <StyledStack direction="row" spacing={2}>
        <FormControl fullWidth>
          <InputLabel id='tags-label'>{toSentenceCase(name)}</InputLabel>
          <Select
            labelId="tags-label"
            id="tags-name"
            label={toSentenceCase(name)}
            value={selectedValue}
            onChange={handleChange}
            displayEmpty
          >
            {optionValues.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button id="recipe-add-tag" variant="contained" onClick={handleAddClick}>Add</Button>
      </StyledStack>
      <Stack direction="row" spacing={2}>
        {selectedItems.map((item, index) => (
          <Chip
            key={index}
            label={item.label}
            onDelete={handleDeleteClick(item.value)}
            deleteIcon={<Close />}
          />
        ))}
      </Stack>
    </div>
  );
};

export default ChipSelect;
