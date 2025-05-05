import React from 'react';
import { Typography } from '@mui/material';
import { toSentenceCase } from '../../../utils/utils';

const LabelValue: React.FC<{ label: string; value: string[] | string | undefined }> = ({ label, value }) => {
  // Check if value is an array and join it into a string
  if (Array.isArray(value)) {
    value = value.map(item => toSentenceCase(item.replace(/([A-Z])/g, ' $1').toLowerCase())).join(', ');
  }

  // Check if value is undefined, null, or an empty string
  if (value === undefined || value === null || value.length === 0) return null;

  return (
    <div style={{ marginBottom: 8 }}>
      <Typography id={`preview-recipe-${label.toLowerCase()}-label`} variant="subtitle1" color="textSecondary">
        {label}
      </Typography>
      <Typography id={`preview-recipe-${label.toLowerCase()}-value`} variant="body1" color="primary">
        {value}
      </Typography>
    </div>
  );
};

export default LabelValue;