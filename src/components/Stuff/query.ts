import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { Child } from './types';

export const getPlexStuff = async () => {
  const response = await tower.get(`/plex/stuff`);
  console.log(response.data);
  return response.data as Child[];
};

export const usePlexStuff = () =>
  useQuery({
    queryKey: ['plex', 'stuff'],
    queryFn: () => getPlexStuff(),
    placeholderData: previousData => previousData,
    retry: false,
  });
