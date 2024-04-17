import { useCallback } from 'react';

import { JSONCodec, NatsError } from 'nats.ws';

import { useSubscription } from '@dashotv/react-nats-context';
import { Msg } from '@dashotv/react-nats-context';

export const useSub = (topic: string, callback: (data) => void) => {
  // console.log('useSub:', topic);
  const jc = JSONCodec();
  const cb = useCallback(
    (err: NatsError | null, msg: Msg) => {
      if (err) {
        console.error('useSubscription:(callback)', topic, err);
        return;
      }
      try {
        const data = jc.decode(msg.data);
        // console.log('useSub:', topic, data);
        callback(data);
      } catch (e) {
        console.error('useSubscription:', topic, e);
      }
    },
    [callback],
  );
  const { connected, connecting, reconnecting, closed } = useSubscription(topic, { callback: cb });
  return { connected, connecting, reconnecting, closed };
};
