import React, { useState } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { queueJob } from '.';

export const JobsMenu = ({ jobs }: { jobs: string[] }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const select = (job: string) => {
    handleCloseNavMenu();
    console.log(job);
    queueJob(job);
  };

  return (
    <>
      <IconButton
        sx={{ backgroundColor: `primary.main`, height: '24px', width: '24px' }}
        size="small"
        onClick={handleOpenNavMenu}
      >
        <SvgIcon sx={{ color: 'black', height: '18px', width: '18px' }} component={IoEllipsisVertical} inheritViewBox />
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
      >
        {jobs.map(name => (
          <MenuItem key={name} sx={{ width: '300px' }} onClick={() => select(name)}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ pt: 0.5 }}>{name}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
