import React from 'react';

import Box from '@mui/material/Box';

import { UserButton } from '@clerk/clerk-react';

import './Navbar.scss';
import SuperSearch from './Search';

export const Admin = () => {
  return (
    <>
      <Box sx={{ height: 51, width: 51 }}>
        <SuperSearch />
      </Box>
      <Box sx={{ height: 51, pt: 1.3 }}>
        <UserButton />
      </Box>
    </>
  );
};
