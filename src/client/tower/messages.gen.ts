// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Response, towerClient } from '.';

export const MessagesIndex = async () => {
  const response = await towerClient.get(`/messages/?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.Message) {
      throw new Error(response.data.Message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export const MessagesCreate = async () => {
  const response = await towerClient.post(`/messages/?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.Message) {
      throw new Error(response.data.Message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};
