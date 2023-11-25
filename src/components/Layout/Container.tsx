import React from 'react';

import MUIContainer from '@mui/material/Container';

export type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return (
    <MUIContainer sx={{ overflow: 'hidden' }} maxWidth="xl">
      {children}
    </MUIContainer>
  );
};
