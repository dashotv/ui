import { JSONCodec, connect } from 'nats.ws';
import { ReactNode, createContext } from 'react';

const url = import.meta.env.NODE_ENV !== 'production' ? 'ws://localhost:9222/' : 'wss://www.dasho.tv:9222/';
const ws = connect({ servers: url });
const jc = JSONCodec();

export const NatsContext = createContext({ ws, jc });

interface ISocketProvider {
  children: ReactNode;
}

export const NatsProvider = (props: ISocketProvider) => (
  <NatsContext.Provider value={{ ws, jc }}>{props.children}</NatsContext.Provider>
);
