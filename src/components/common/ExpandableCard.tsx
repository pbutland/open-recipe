import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface ExpandableCardProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ id, title, children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card>
      <CardHeader
        id={id}
        title={title}
        action={
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandMoreIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <CardContent style={{ display: expanded ? 'block' : 'none' }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ExpandableCard;