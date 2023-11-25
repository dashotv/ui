import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { UserButton } from '@clerk/clerk-react';

import { MessagesIcon } from './Messages';
import { NatsIcon } from './Nats';
import './Navbar.scss';
import SuperSearch from './Search';

export const Admin = () => {
  return (
    <>
      <Box sx={{ flexGrow: 0, height: 51, width: 51, pt: '2px' }}>
        <SuperSearch />
      </Box>
      <Box sx={{ flexGrow: 0, height: 51, width: 51, pt: '2px' }}>
        <Link to="/admin">
          <IconButton aria-label="admin panel">
            <MessagesIcon />
          </IconButton>
        </Link>
      </Box>
      <Box sx={{ flexGrow: 0, height: 51, width: 51, pt: '2px' }}>
        <Link to="/admin">
          <IconButton aria-label="admin panel">
            <NatsIcon />
          </IconButton>
        </Link>
      </Box>
      <Box sx={{ flexGrow: 0, height: 51, width: 51, pt: 1.5, pl: 1 }}>
        <UserButton />
      </Box>
    </>
  );
};
