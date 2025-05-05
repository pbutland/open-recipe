import React from 'react';
import RecipePreview from './preview/RecipePreview';
import FileViewer from './file/FileViewer';
import { Box, Tabs, Tab } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    'aria-controls': `tabpanel-${index}`,
  };
}

const GeneratedRecipe: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="child-item">
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab id='preview-tab' label="Preview" {...a11yProps(0)} />
        <Tab id='file-tab' label="File" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <RecipePreview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FileViewer />
      </TabPanel>
    </div>
  );
};

export default GeneratedRecipe;
