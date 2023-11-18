import { useSnackbar } from 'notistack';

import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { UserButton } from '@clerk/clerk-react';

import { useSub } from 'hooks/useSub';

import './Navbar.scss';
import { Notice } from './Notice';
import SuperSearch from './Search';
import Logo from '/logo-small.png';

const pages = [
  { name: 'Home', page: '/', exact: true },
  { name: 'Series', page: '/series' },
  { name: 'Movies', page: '/movies' },
  { name: 'Releases', page: '/releases' },
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const matchPath = (path, exact) => {
    if (exact) {
      return path === location.pathname;
    }
    return location.pathname.startsWith(path);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useSub('seer.notices', data => enqueueSnackbar(<Notice data={data} />, { variant: data.level }));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              {pages.map(({ name, page, exact }) => (
                <Link key={name} to={page}>
                  <MenuItem sx={{ width: '300px' }} onClick={handleCloseNavMenu} selected={matchPath(page, exact)}>
                    <Typography textAlign="center">{name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box className="menu" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ name, page, exact }) => (
              <Link key={name} to={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                  variant={matchPath(page, exact) ? 'outlined' : 'text'}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link to="/admin">
              <IconButton aria-label="admin panel">
                <AdminPanelSettingsOutlinedIcon fontSize="large" color="primary" />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <SuperSearch />
          </Box>
          <Box sx={{ flexGrow: 0, height: 51, width: 51, pt: 1.5, pl: 1 }}>
            <UserButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
