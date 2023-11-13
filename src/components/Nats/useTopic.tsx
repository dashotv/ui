import React, { useEffect } from 'react';

import { useNats } from './usenats';

export function useTopic(topic: string, func: (data: any) => void) {
  const { add, remove } = useNats();

  useEffect(() => {
    // console.log('useTopic:', topic);
    const index = add(topic, func);

    return () => {
      //   console.log('useTopic: cleanup', topic, index);
      if (index === undefined) {
        return;
      }
      remove(topic, index);
    };
  }, [add]);
}
