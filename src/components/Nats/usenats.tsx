import { useContext } from 'react';

import { NatsContext } from './context';

export const useNats = () => {
  const { ws, jc } = useContext(NatsContext);

  return { ws, jc };
};
