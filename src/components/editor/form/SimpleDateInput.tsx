import React, { useContext, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RecipeContext from '../../../context/RecipeContext';
import { toSentenceCase } from '../../../utils/utils';

interface Props {
  name: string;
}

const SimpleDateInput: React.FC<Props> = ({ name }) => {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    setRecipe({
      ...recipe,
      [name]: date?.toISOString()
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={toSentenceCase(name)}
        value={selectedDate}
        onChange={handleDateChange}
        format="dd/MM/yyyy"
        slotProps={{
          textField: { id: `recipe-${name}` },
        }}
      />
    </LocalizationProvider>
  );
};

export default SimpleDateInput;
