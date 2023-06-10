import { createContext, ReactChild } from 'react';
import { connect, JSONCodec } from 'nats.ws';

const url = process.env.NODE_ENV !== 'production' ? 'ws://localhost:9222/' : 'wss://www.dasho.tv:9222/';
const ws = connect({ servers: url });
const jc = JSONCodec();

export const NatsContext = createContext({ ws, jc });

interface ISocketProvider {
  children: ReactChild;
}

export const NatsProvider = (props: ISocketProvider) => (
  <NatsContext.Provider value={{ ws, jc }}>{props.children}</NatsContext.Provider>
);
