import { JSONCodec, StringCodec, connect } from 'nats.ws';

import React from 'react';
import { ReactNode, createContext } from 'react';

const url = import.meta.env.PROD ? 'wss://www.dasho.tv:9222/' : 'ws://localhost:9222/';
const ws = connect({ servers: [url] });
const jc = JSONCodec();
const sc = StringCodec();

interface ISocketProvider {
  children: ReactNode;
}
export const NatsContext = createContext({ ws, jc, sc });

export const NatsProvider = (props: ISocketProvider) => {
  return <NatsContext.Provider value={{ ws, jc, sc }}>{props.children}</NatsContext.Provider>;
};
