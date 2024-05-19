import React from 'react';
import { IoEllipsisVerticalCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { clickHandler } from 'utils/handler';

import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon } from '@mui/material';

export interface MenuMapItem {
  name: string;
  icon?: React.ReactNode;
  url?: string;
  path?: string;
  action?: () => void;
}

const icon = (item: MenuMapItem) => {
  if (item.icon) {
    return item.icon;
  }
  if (item.url) {
    return <OpenInNewIcon fontSize="small" />;
  }
  if (item.path) {
    return <LinkIcon fontSize="small" />;
  }
  return <RadioButtonCheckedIcon fontSize="small" />;
};

// TODO: change icon when open?
export const MenuMap = ({ size = 'large', items }: { size?: 'small' | 'medium' | 'large'; items: MenuMapItem[] }) => {
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
      <IconButton size="small" onClick={clickHandler(event => handleClick(event))}>
        <SvgIcon component={IoEllipsisVerticalCircleSharp} inheritViewBox fontSize={size} color="primary" />
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
            <ListItemIcon>{icon(item)}</ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
