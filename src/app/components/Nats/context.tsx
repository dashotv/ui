import { useEffect, useState, createContext, ReactChild } from 'react';
import { connect, JSONCodec, NatsConnection } from 'nats.ws';

const url =
  process.env.NODE_ENV !== 'production'
    ? 'ws://localhost:9222/'
    : 'wss://10.0.4.61:9222/';
const ws = connect({ servers: url });
const jc = JSONCodec();

export const NatsContext = createContext({ ws, jc });

interface ISocketProvider {
  children: ReactChild;
}

export const NatsProvider = (props: ISocketProvider) => (
  <NatsContext.Provider value={{ ws, jc }}>
    {props.children}
  </NatsContext.Provider>
);
