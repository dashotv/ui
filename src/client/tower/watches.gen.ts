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
