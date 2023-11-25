import React, { useEffect, useState } from 'react';

import TrafficIcon from '@mui/icons-material/Traffic';

import { useNats } from '@quara-dev/react-nats-context';

import './Navbar.scss';

export const NatsIcon = () => {
  const { reconnecting, connecting, connected } = useNats();
  const [color, setColor] = useState<'primary' | 'warning' | 'error' | 'disabled'>('disabled');
  useEffect(() => {
    if (connected) {
      setColor('primary');
    } else if (reconnecting || connecting) {
      setColor('warning');
    } else {
      setColor('error');
    }
  }, [connected, reconnecting, connecting]);
  return <TrafficIcon color={color} fontSize="large" />;
};
