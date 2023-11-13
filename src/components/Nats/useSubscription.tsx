import { Subscription } from 'nats.ws';

import { useEffect } from 'react';

import { useTopic } from './useTopic';
import { useNats } from './usenats';

export function useSubscription(topic, func) {
  useTopic(topic, func);
}
