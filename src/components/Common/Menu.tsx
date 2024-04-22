import React from 'react';
import { IoEllipsisVerticalCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { clickHandler } from 'utils/handler';

import { IconButton, Menu, MenuItem, SvgIcon } from '@mui/material';

export interface MenuMapItem {
  name: string;
  url?: string;
  path?: string;
  action?: () => void;
}

// TODO: change icon when open?
export const MenuMap = ({ items }: { items: MenuMapItem[] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!event) {
      throw new Error('event is required');
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClickItem = (item: MenuMapItem) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.url) {
      window.open(item.url, '_blank');
    } else if (item.action) {
      item.action();
    } else {
      throw new Error('item is invalid');
    }
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={clickHandler(event => handleClick(event))}>
        <SvgIcon component={IoEllipsisVerticalCircleSharp} inheritViewBox fontSize="large" color="primary" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items?.map((item, index) => (
          <MenuItem key={index} onClick={clickHandler(() => handleClickItem(item))}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
