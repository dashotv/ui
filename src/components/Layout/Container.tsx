import React from 'react';

import MUIContainer from '@mui/material/Container';

import { WrapErrorBoundary } from 'components/Common';

export type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return (
    <MUIContainer sx={{ overflow: 'hidden', pb: 1, pt: 1 }}>
      <WrapErrorBoundary>{children}</WrapErrorBoundary>
    </MUIContainer>
  );
};
