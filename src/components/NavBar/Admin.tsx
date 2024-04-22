import React from 'react';

import Box from '@mui/material/Box';

import { UserButton } from '@clerk/clerk-react';

import { NavbarMenu } from './Menu';
import './Navbar.scss';
import SuperSearch from './Search';

export const Admin = () => {
  return (
    <>
      <Box sx={{ height: 51, width: 37 }}>
        <SuperSearch />
      </Box>
      <Box sx={{ height: 51, width: 37 }}>
        <NavbarMenu />
      </Box>
      <Box sx={{ height: 51, pt: 1.3 }}>{import.meta.env.PROD && <UserButton />}</Box>
    </>
  );
};
