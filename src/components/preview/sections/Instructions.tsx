import React from 'react';
import { Divider, Typography } from '@mui/material';
import LabelValue from './LabelValue';
import Instruction from '../../../types/Instruction';

const Instructions: React.FC<{ instructions: Instruction[] | undefined }> = ({ instructions }) => {
  return (
    <div>
      {instructions && instructions.length > 0 && (
        <Typography id="preview-recipe-instructions-title" variant="h5" color="primary">
          Instructions
        </Typography>
      )}
      {instructions?.map(instruction => {
        const step = instruction.step !== undefined ? `Step ${instruction.step}` : '';
        return <LabelValue label={step} value={instruction.text} />
      })}
      {instructions && instructions.length > 0 && (<Divider />)}
    </div>
  );
};

export default Instructions;
