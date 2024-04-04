import * as tower from 'client/tower';

import { useQuery } from '@tanstack/react-query';

export const getUsers = async () => {
  const response = await tower.UsersIndex();
  return response;
};

export const useUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    placeholderData: previousData => previousData,
    retry: false,
  });
