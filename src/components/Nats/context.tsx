import { JSONCodec, StringCodec, connect } from 'nats.ws';

import React from 'react';
import { ReactNode, createContext } from 'react';

import { useTopicManager } from './useTopic';

const url = import.meta.env.PROD ? 'wss://www.dasho.tv:9222/' : 'ws://localhost:9222/';
const ws = connect({ servers: url });
const jc = JSONCodec();
const sc = StringCodec();

interface ISocketProvider {
  children: ReactNode;
}
const add = (t: string, f: (data: unknown) => void) => {
  console.error('wrong add function', t, f);
};
const remove = (t: string, f: (data: unknown) => void) => {
  console.error('wrong remove function', t, f);
};
export const NatsContext = createContext({ ws, jc, sc, add, remove });

export const NatsProvider = (props: ISocketProvider) => {
  const { add, remove } = useTopicManager();
  return <NatsContext.Provider value={{ ws, jc, sc, add, remove }}>{props.children}</NatsContext.Provider>;
};
