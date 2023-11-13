import { useContext } from 'react';

import { NatsContext } from './context';

export const useNats = () => {
  return useContext(NatsContext);
};
