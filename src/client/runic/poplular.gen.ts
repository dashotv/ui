// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { PopularResponse, Response, runicClient } from '.';

export interface PoplularIndexRequest {
  interval: string;
}
export interface PoplularIndexResponse extends Response {
  result: PopularResponse;
  total: number;
}
export const PoplularIndex = async (params: PoplularIndexRequest) => {
  const response = await runicClient.get(`/poplular/${params.interval}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PoplularIndexResponse;
};