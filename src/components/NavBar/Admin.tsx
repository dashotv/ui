import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { UserButton } from '@clerk/clerk-react';

import { NavbarMenu } from './Menu';
import './Navbar.scss';
import SuperSearch from './Search';

export const Admin = () => {
  return (
    <>
      <Stack direction="row" spacing={-1.5}>
        <SuperSearch />
        <NavbarMenu />
      </Stack>
      <Box sx={{ height: 51, pl: 1, pt: 1.3 }}>{import.meta.env.PROD && <UserButton />}</Box>
    </>
  );
};
