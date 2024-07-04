// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Medium, Response, towerClient } from '.';

export interface MediumShowRequest {
  id: string;
}
export interface MediumShowResponse extends Response {
  result: Medium;
}
export const MediumShow = async (params: MediumShowRequest) => {
  const response = await towerClient.get(`/medium/medium/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MediumShowResponse;
};