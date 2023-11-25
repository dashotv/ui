import React, { useEffect, useState } from 'react';
import { IoFileTrayFull } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

import SvgIcon from '@mui/material/SvgIcon';

import { useSub } from 'hooks/useSub';

export const Messages = () => {
  const [color, setColor] = useState<'inherit' | 'warning'>('inherit');
  const location = useLocation();
  const cb = () => {
    setColor('warning');
  };
  useEffect(() => {
    if (location.pathname === '/admin') {
      setColor('inherit');
    }
  }, [color, location.pathname]);
  useSub('tower.logs', cb);

  return <SvgIcon component={IoFileTrayFull} inheritViewBox color={color} />;
};
