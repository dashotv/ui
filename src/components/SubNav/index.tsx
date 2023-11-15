import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './SubNav.scss';

export default function Subnav({ items }: { items: { name: string; path: string; exact?: boolean }[] }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const location = useLocation();

  const matchPath = (path, exact) => {
    if (exact) {
      return path === location.pathname;
    }
    return location.pathname.startsWith(path);
  };

  const current = () => {
    for (const { name, path, exact } of items) {
      if (matchPath(path, exact)) {
        return name;
      }
    }
    return 'Viewing';
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MoreIcon />
          <Typography sx={{ ml: '5px' }} variant="h6">
            {current()}
          </Typography>
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
            items.map(({ name, path }) => (
              <Link key={name} to={path}>
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              </Link>
            ))}
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {items &&
          items.map(({ name, path, exact }) => (
            <Link key={name} to={path}>
              <Button variant={matchPath(path, exact) ? 'outlined' : 'text'}>
                <Typography textAlign="center">{name}</Typography>
              </Button>
            </Link>
          ))}
      </Box>
    </Toolbar>
  );
}
