import { Subscription } from 'nats.ws';

import { useEffect, useState } from 'react';

import { useNats } from './usenats';

export function useSubscription(topic: string, func: (data) => void) {
  const { ws, jc } = useNats();
  const [sub, setSub] = useState<Subscription | null>(null);

  useEffect(() => {
    ws.then(nc => {
      const sub = nc.subscribe(topic, {
        callback: (err, msg) => {
          if (err) {
            console.error('useSubscription:(callback)', topic, err);
            return;
          }
          try {
            const data = jc.decode(msg.data);
            func(data);
          } catch (e) {
            console.error('useSubscription:', topic, e);
          }
        },
      });
      setSub(sub);
    });

    return () => {
      sub?.unsubscribe();
    };
  }, [ws, jc]);
}
