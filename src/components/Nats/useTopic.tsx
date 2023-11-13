import { Subscription } from 'nats.ws';

import { useEffect, useState } from 'react';

import { useNats } from './usenats';

type TopicFunc = (data: unknown) => void;

export function useTopicManager() {
  const topics: string[] = [
    'seer.episodes',
    'seer.notices',
    'seer.downloads',
    'flame.qbittorrents',
    'flame.nzbs',
    'tower.logs',
    'tower.requests',
  ];
  const [functions, setFunctions] = useState<Map<string, TopicFunc[]>>(new Map<string, TopicFunc[]>());
  const [subscriptions, setSubscriptions] = useState<Map<string, Subscription>>(new Map<string, Subscription>());
  const { ws, jc, sc } = useNats();

  const addFunction = (topic: string, func: TopicFunc) => {
    setFunctions(prev => {
      const list = prev.get(topic) || [];
      prev.set(topic, [...list!, func]);
      return prev;
    });
  };
  const removeFunction = (topic: string, func: TopicFunc) => {
    const list = functions.get(topic);
    if (!list) {
      console.error('setFunction: topic not found?', topic);
      return;
    }
    setFunctions(prev => {
      const list = prev.get(topic);
      if (!list) {
        console.error('setFunction: topic not found?', topic);
        return prev;
      }
      const index = list.indexOf(func);
      if (index === -1) {
        console.error('setFunction: function not found?', topic);
        return prev;
      }
      list.splice(index, 1);
      prev.set(topic, list);
      return prev;
    });
  };

  const add = (topic: string, func: TopicFunc) => {
    addFunction(topic, func);
  };

  const remove = (topic: string, func: TopicFunc) => {
    removeFunction(topic, func);
  };

  const setSubscription = (topic: string, sub: Subscription) => {
    setSubscriptions(prev => {
      prev.set(topic, sub);
      return prev;
    });
  };

  useEffect(() => {
    console.log('NatsProvider');
    ws.then(nc => {
      topics.forEach(topic => {
        const sub = nc.subscribe(topic, {
          callback: (err, msg) => {
            if (err) {
              console.error(err);
              return;
            }
            try {
              const list = functions.get(topic);
              if (!list || list.length === 0) {
                return;
              }

              const data = jc.decode(msg.data);
              list.forEach(func => func(data));
            } catch (e) {
              console.error('useNats: ', e);
            }
          },
        });
        setSubscription(topic, sub);
      });
    });

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [ws, jc, sc]);

  return { add, remove };
}
