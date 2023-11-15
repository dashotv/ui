import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { User } from 'types/user';

export const getUsers = async () => {
  const response = await axios.get('/api/tower/users/');
  return response.data as User[];
};

export const useUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    placeholderData: previousData => previousData,
    retry: false,
  });
