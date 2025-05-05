import React from 'react';
import { Typography } from '@mui/material';

const Title: React.FC<{ title: string | undefined }> = ({ title }) => {
  if (!title || title.length === 0) return null;

  return (
    <Typography id="preview-recipe-name" variant="h4" color="textPrimary">
      {title}
    </Typography>
  );
};

export default Title;
