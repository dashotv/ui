import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavPage } from './types';

export function Subnav({ items }: { items: NavPage[] }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const location = useLocation();

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

  const buttonsAndMenu = (items: NavPage[]) => {
    if (items.length > 4) {
      return (
        <>
          {buttons(items.slice(0, 4))}
          {menu(items.slice(4))}
        </>
      );
    }
    return buttons(items);
  };

  const buttons = (items: NavPage[]) => (
    <>
      {items?.map(({ name, page, exact }) => (
        <Link key={page} to={page}>
          <Button variant={matchPath(page, exact) ? 'outlined' : 'text'}>
            <Typography textAlign="center">{name}</Typography>
          </Button>
        </Link>
      ))}
    </>
  );

  const menu = (items: NavPage[]) => (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MoreIcon />
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
        {items &&
          items.map(({ name, page }) => (
            <Link key={page} to={page}>
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{name}</Typography>
              </MenuItem>
            </Link>
          ))}
      </Menu>
    </>
  );

  return (
    <Toolbar disableGutters>
      <Stack direction="row" alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
        {buttons(items)}
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ display: { xs: 'flex', md: 'none' } }}>
        {buttonsAndMenu(items)}
      </Stack>
    </Toolbar>
  );
}
