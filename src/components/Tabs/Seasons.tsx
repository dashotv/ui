import * as React from 'react';

import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Seasons({
  current,
  changeSeason,
  seasons,
}: {
  current: number;
  changeSeason: (id: number) => void;
  seasons: number[];
}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function clickSeason(n: number) {
    if (current !== n) {
      changeSeason(n);
    }
  }
  return (
    <Paper sx={{ mb: 2, p: 2, width: '100%' }}>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MoreIcon />
          <Typography sx={{ ml: '5px' }} variant="h6">
            Season {current}
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
          {seasons &&
            seasons.map(s => (
              <Link key={s} onClick={() => clickSeason(s)} underline="none">
                <MenuItem key={s} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Season {s}</Typography>
                </MenuItem>
              </Link>
            ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <ButtonGroup>
          {seasons.map(s => (
            <Button
              size="small"
              variant={current === s ? 'contained' : 'outlined'}
              key={s}
              id={s.toString()}
              onClick={() => clickSeason(s)}
            >
              {s}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Paper>
  );
}
