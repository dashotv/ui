// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Response, User, towerClient } from '.';

export interface UsersIndexResponse extends Response {
  result: User[];
  total: number;
}
export const UsersIndex = async () => {
  const response = await towerClient.get(`/users/?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as UsersIndexResponse;
};
