import { useContext } from 'react';

import { NatsContext } from './context';

export const useNats = () => {
  const { ws, jc, sc, add, remove } = useContext(NatsContext);

  return { ws, jc, sc, add, remove };
};
