import { useEffect } from 'react';

import { useNats } from './usenats';

export function useSubscription(topic: string, func: (data) => void) {
  const { add, remove } = useNats();
  useEffect(() => {
    console.log('useTopic:', topic);
    add(topic, func);

    return () => {
      remove(topic, func);
    };
  }, [add, remove]);
}
