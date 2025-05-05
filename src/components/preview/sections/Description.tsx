import React from 'react';
import { Typography } from '@mui/material';

interface DescriptionProps {
  description: string | undefined;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {

  if (!description || description.length === 0) return null;

  return (
    <Typography id="preview-recipe-description" variant="subtitle1" color="textPrimary">
      {description}
    </Typography>
  );
};

export default Description;
