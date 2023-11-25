import React, { useEffect, useState } from 'react';
import { IoFileTrayFull } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

import SvgIcon from '@mui/material/SvgIcon';

import { useSub } from 'hooks/useSub';

import './Navbar.scss';

export const MessagesIcon = () => {
  const [color, setColor] = useState<'primary' | 'warning'>('primary');
  const location = useLocation();
  const cb = () => {
    setColor('warning');
  };
  useEffect(() => {
    if (location.pathname === '/admin') {
      setColor('primary');
    }
  }, [color, location.pathname]);
  useSub('tower.logs', cb);
  return <SvgIcon component={IoFileTrayFull} inheritViewBox fontSize="large" color={color} />;
};
