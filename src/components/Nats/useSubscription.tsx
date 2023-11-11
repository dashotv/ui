import { Subscription } from 'nats.ws';

import { useEffect } from 'react';

import { useNats } from './usenats';

export function useSubscription(topic, func) {
  const { ws, jc } = useNats();
  useEffect(() => {
    let sub: Subscription | null = null;

    ws.then(nc => {
      sub = nc.subscribe(topic, {
        callback: (err, msg) => {
          if (err) {
            console.error(err);
            return;
          }

          const data = jc.decode(msg.data);
          func(data);
        },
      });
    });

    return () => {
      sub?.unsubscribe();
    };
  }, [ws, jc, topic, func]);
}
