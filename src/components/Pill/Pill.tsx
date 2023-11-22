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
}: {
  name: string;
  value: React.ReactElement | string | number;
  color?: string;
  variant?: 'row' | 'column';
  icon?: React.ReactElement;
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
        }}
      >
        <Box
          sx={{
            color: 'black',
            backgroundColor: colorValue(),
            pr: '4px',
            pl: '4px',
          }}
        >
          {icon ? icon : <Typography variant="button">{name}</Typography>}
        </Box>
        <Box
          sx={{
            color: colorValue(),
            backgroundColor: '#363636',
            pr: '4px',
            pl: '4px',
            overflow: 'hidden',
          }}
        >
          {value}
        </Box>
      </Box>
    </div>
  );
};
