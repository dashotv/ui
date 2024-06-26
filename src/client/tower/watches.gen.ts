// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Response, Watch, towerClient } from '.';

export interface WatchesIndexRequest {
  medium_id: string;
  username: string;
}
export interface WatchesIndexResponse extends Response {
  result: Watch[];
  total: number;
}
export const WatchesIndex = async (params: WatchesIndexRequest) => {
  const response = await towerClient.get(`/watches/?medium_id=${params.medium_id}&username=${params.username}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as WatchesIndexResponse;
};

export interface WatchesCreateRequest {
  medium_id: string;
  username: string;
}
export interface WatchesCreateResponse extends Response {
  result: Watch;
}
export const WatchesCreate = async (params: WatchesCreateRequest) => {
  const response = await towerClient.post(`/watches/?medium_id=${params.medium_id}&username=${params.username}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as WatchesCreateResponse;
};

export interface WatchesDeleteRequest {
  id: string;
}

export const WatchesDelete = async (params: WatchesDeleteRequest) => {
  const response = await towerClient.delete(`/watches/${params.id}?`);

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

export interface WatchesDeleteMediumRequest {
  medium_id: string;
}

export const WatchesDeleteMedium = async (params: WatchesDeleteMediumRequest) => {
  const response = await towerClient.delete(`/watches/medium?medium_id=${params.medium_id}`);

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
