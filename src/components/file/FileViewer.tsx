import React, { useContext, useState } from 'react';
import { Box, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import styled from 'styled-components';
import yaml from 'js-yaml';
import RecipeContext from '../../context/RecipeContext';

const StyledBox = styled(Box)`
  && {
    height: calc(100vh - 80px);
  }
`;

const FileViewer: React.FC = () => {
  const { recipe } = useContext(RecipeContext);
  const [fileType, setFileType] = useState('json');

  let content = JSON.stringify(recipe, null, 2);
  if (fileType === 'yaml') {
    content = yaml.dump(recipe, {
      indent: 4,
      skipInvalid: true
    });
  }

  return (
    <StyledBox>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RadioGroup
          aria-label="demo"
          defaultValue="json"
          name="controlled-radio-buttons-group"
          onChange={(event) => {
            setFileType(event.target.value);
          }}
          row
        >
          <FormControlLabel value="json" control={<Radio />} label="JSON" />
          <FormControlLabel value="yaml" control={<Radio />} label="YAML" />
        </RadioGroup>
      </div>
      <Paper elevation={2} style={{ height: '100%', overflowY: 'auto' }}>
        <pre>
          {content}
        </pre>
      </Paper>
    </StyledBox>
  );
};

export default FileViewer;
