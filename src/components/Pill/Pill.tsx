import React from 'react';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Pill = ({
  name,
  value,
  color = 'primary',
  variant = 'row',
  icon,
  width,
  size = 'medium',
}: {
  name: string;
  value: React.ReactElement | string | number;
  color?: string;
  variant?: 'row' | 'column';
  icon?: React.ReactElement;
  width?: string | number;
  size?: 'small' | 'medium' | 'large';
}) => {
  const display = variant == 'row' ? 'flex' : 'block';
  const theme = useTheme();

  const colorValue = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'success':
        return theme.palette.success.main;
      default:
        return color;
    }
  };
  const fontSize = () => {
    switch (size) {
      case 'small':
        return '0.75rem';
      case 'large':
        return '1.25rem';
      default:
        return '1rem';
    }
  };
  const height = () => {
    switch (size) {
      case 'small':
        return '1.25rem';
      case 'large':
        return '1.75rem';
      default:
        return '1.5rem';
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: display,
          border: '1px solid',
          borderRadius: '5px',
          borderColor: colorValue(),
          overflow: 'hidden',
          width: 'fit-content',
          fontSize: fontSize(),
          height: height(),
        }}
      >
        <Box
          sx={{
            color: 'black',
            backgroundColor: colorValue(),
            pr: '4px',
            pl: '4px',
            fontSize: fontSize(),
            height: height(),
          }}
        >
          {icon ? (
            icon
          ) : (
            <Typography fontSize={fontSize()} variant="button">
              {name}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            color: colorValue(),
            backgroundColor: '#363636',
            pr: '4px',
            pl: '4px',
            overflow: 'hidden',
            maxWidth: width,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontSize: fontSize(),
            height: height(),
          }}
        >
          {value}
        </Box>
      </Box>
    </div>
  );
};
