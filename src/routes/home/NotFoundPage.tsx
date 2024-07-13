import React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

const NotFoundPage = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '10vh',
        }}
      >
        <Alert severity="warning">
          <AlertTitle>404</AlertTitle>
          <div role="alert">The page you are trying to load does not exist.</div>
        </Alert>
      </Box>
    </>
  );
};

export default NotFoundPage;
