import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import './Navbar.scss';
import { NavPage, NavPageWithChildren } from './types';
import Logo from '/logo-small.png';

export type NavProps = {
  pages: NavPageWithChildren[];
  matchPath: (page: string, exact?: boolean) => boolean;
  matchAny: (page: string, exact?: boolean, children?: NavPage[]) => boolean;
  handleOpenNavMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu?: () => void;
};
export const Nav = ({ pages, matchPath, matchAny }: NavProps) => {
  return (
    <>
      <Link to="/">
        <Box sx={{ mr: 2 }}>
          <img alt="logo" src={Logo} width="40" height="40" />
        </Box>
      </Link>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          textDecoration: 'none',
        }}
      >
        DASHOTV
      </Typography>

      <Box className="menu" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        {pages.map(({ icon, name, page, exact, children }) => (
          <Stack key={page} spacing={0} direction="row" alignItems="center">
            <Link to={page} title={name}>
              <IconButton sx={{ color: matchAny(page, exact, children) ? 'primary.main' : 'gray' }}>{icon}</IconButton>
            </Link>
            <Stack
              key={page}
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                pl: matchAny(page, exact, children) ? 1 : 0,
                pr: matchAny(page, exact, children) ? 1 : 0,
                backgroundColor: matchAny(page, exact, children) ? '#363636' : 'inherit',
                height: '48px',
                borderRadius: '6px',
              }}
            >
              {matchAny(page, exact, children) &&
                children?.map(({ icon, name, page, exact }) => (
                  <Link key={page} to={page} title={name}>
                    <Button
                      variant={matchPath(page, exact) ? 'outlined' : 'text'}
                      key={page}
                      sx={{ color: 'primary.dark', borderColor: 'primary.dark' }}
                    >
                      {icon}
                    </Button>
                  </Link>
                ))}
            </Stack>
          </Stack>
        ))}
      </Box>
    </>
  );
};
