import * as React from 'react';

import { Box } from '@mui/material';

import { WrapErrorBoundary } from '@dashotv/components';

export type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <WrapErrorBoundary>{children}</WrapErrorBoundary>
    </Box>
  );
};
