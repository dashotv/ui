// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { NzbgetPayload, Response, towerClient } from '.';

export const HooksPlex = async () => {
  const response = await towerClient.get(`/hooks/plex?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export interface HooksNzbgetRequest {
  payload: NzbgetPayload;
}

export const HooksNzbget = async (params: HooksNzbgetRequest) => {
  const response = await towerClient.post(`/hooks/nzbget?`, params.payload);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};