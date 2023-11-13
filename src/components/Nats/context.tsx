import { JSONCodec, StringCodec, Subscription, connect } from 'nats.ws';

import React, { useEffect } from 'react';
import { ReactNode, createContext } from 'react';

type TopicFunc = (data: unknown) => void;
const topics: Map<string, TopicFunc[]> = new Map([
  ['seer.episodes', []],
  ['seer.notices', []],
  ['seer.downloads', []],
  ['flame.qbittorrents', []],
  ['flame.nzbs', []],
  ['tower.logs', []],
  ['tower.requests', []],
]);

const subscriptions: Map<string, Subscription | null> = new Map();

const url = import.meta.env.PROD ? 'wss://www.dasho.tv:9222/' : 'ws://localhost:9222/';
const ws = connect({ servers: url });
const jc = JSONCodec();
const sc = StringCodec();

interface ISocketProvider {
  children: ReactNode;
}

const add = (topic: string, func: TopicFunc) => {
  const list = topics.get(topic);
  if (!list) {
    console.error('add: topic not found?', topic);
    return;
  }
  topics.set(topic, [...list!, func]);
  if (!list) {
    return;
  }
  const index = list.length - 1;
  console.log('add', topic, index);
  return index;
};

const remove = (topic: string, index: number) => {
  console.log('remove', topic, index);
  const list = topics.get(topic);
  if (!list) {
    return;
  }

  list.splice(index, 1);
  topics.set(topic, list);
};

export const NatsContext = createContext({ ws, jc, sc, add, remove });

export const NatsProvider = (props: ISocketProvider) => {
  useEffect(() => {
    console.log('NatsProvider');
    ws.then(nc => {
      topics.forEach((_, topic) => {
        subscriptions.set(
          topic,
          nc.subscribe(topic, {
            callback: (err, msg) => {
              if (err) {
                console.error(err);
                return;
              }
              try {
                const data = jc.decode(msg.data);
                const list = topics.get(topic) || [];
                list.forEach(func => func(data));
              } catch (e) {
                console.error('useNats: ', e);
              }
            },
          }),
        );
      });
    });
  }, [ws, jc, sc]);

  return <NatsContext.Provider value={{ ws, jc, sc, add, remove }}>{props.children}</NatsContext.Provider>;
};
