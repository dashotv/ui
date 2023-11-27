import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Box from '@mui/material/Box';

export const LoadingIndicator = () => (
  <Box
    sx={{
      backgroundColor: 'black',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      overflow: 'hidden',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      opacity: 0.6,
      display: 'flex',
      zIndex: 1000,
    }}
  >
    <ThreeDots width="60" height="30" radius="3" color="white" ariaLabel="three-dots-loading" visible={true} />
  </Box>
);
