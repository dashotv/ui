import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { User } from './types';

export const getUsers = async () => {
  const response = await tower.get('/users/');
  return response.data as User[];
};

export const useUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    placeholderData: previousData => previousData,
    retry: false,
  });
