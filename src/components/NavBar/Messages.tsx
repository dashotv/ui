import React, { useEffect, useState } from 'react';
import { IoFileTrayFull } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

import SvgIcon from '@mui/material/SvgIcon';

import { useSub } from 'hooks/sub';
import { EventLog } from 'types/events';

export const Messages = () => {
  const [color, setColor] = useState<'inherit' | 'error'>('inherit');
  const location = useLocation();
  const cb = (data: EventLog) => {
    console.log(data);
    if (data.log.level === 'error') {
      setColor('error');
    }
  };
  useEffect(() => {
    if (location.pathname === '/admin/logs') {
      setColor('inherit');
    }
  }, [color, location.pathname]);
  useSub('tower.logs', cb);

  return <SvgIcon component={IoFileTrayFull} inheritViewBox color={color} />;
};
