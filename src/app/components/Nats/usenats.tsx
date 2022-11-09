import { NatsContext } from './context';
import { useContext } from 'react';

export const useNats = () => {
  const { ws, jc } = useContext(NatsContext);

  return { ws, jc };
};
