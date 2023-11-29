import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { NavProps } from './Nav';
import './Navbar.scss';
import Logo from '/logo-small.png';

export const NavSmall = ({ pages, matchPath, matchAny }: NavProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Link to="/">
        <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          <img alt="logo" src={Logo} width="40" height="40" />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        DASHOTV
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map(({ name, icon, page, exact }) => (
            <Link key={page} to={page}>
              <MenuItem sx={{ width: '300px' }} onClick={handleCloseNavMenu} selected={matchPath(page, exact)}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {icon}
                  <Typography sx={{ pt: 0.5 }}>{name}</Typography>
                </Stack>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
      <Box className="menu" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        {pages.map(({ name, page, exact, children }) => (
          <Stack key={page} spacing={0} direction="row" alignItems="center">
            <Link to={page}>
              <IconButton
                onClick={handleCloseNavMenu}
                sx={{ color: matchAny(page, exact, children) ? 'primary.main' : 'gray' }}
              >
                {name}
              </IconButton>
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
                children?.length &&
                children.length > 0 &&
                children.map(({ name, page, exact }) => (
                  <Link key={page} to={page}>
                    <Button
                      variant={matchPath(page, exact) ? 'outlined' : 'text'}
                      key={page}
                      sx={{ color: 'primary.dark', borderColor: 'primary.dark' }}
                    >
                      {name}
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
