import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Box from '@mui/material/Box';

export const LoadingIndicator = () => (
  <Box
    sx={{
      backgroundColor: '#404040',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '80px',
      height: '40px',
      margin: '2em auto',
      overflow: 'hidden',
      justifyContent: 'center',
      borderRadius: '15px',
      pt: '5px',
      pl: '10px',
      opacity: 0.6,
    }}
  >
    <ThreeDots width="60" height="30" radius="3" color="white" ariaLabel="three-dots-loading" visible={true} />
  </Box>
);
