import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';

const StyledTooltipIcon = styled(IconButton)`
  && {
    padding: 2px;
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.54);
  }
`;

/**
 * TooltipWrapper - A component that wraps children with an optional help tooltip
 * 
 * This component takes a child element and an optional description string.
 * When a description is provided, it renders the child element alongside a
 * question mark icon that displays the description text in a tooltip when hovered.
 * If no description is provided, it simply renders the child element without any tooltip.
 * 
 * @example
 * // Basic usage with a form field:
 * <TooltipWrapper description="Enter your full name as it appears on your ID">
 *   <TextField label="Full Name" />
 * </TooltipWrapper>
 */
interface TooltipWrapperProps {
  children: React.ReactNode;
  description?: string;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ children, description }) => {
  if (!description) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {children}
      <Tooltip title={description} placement="top" arrow>
        <StyledTooltipIcon size="small">
          <HelpOutlineIcon fontSize="small" />
        </StyledTooltipIcon>
      </Tooltip>
    </div>
  );
};

export default TooltipWrapper;
