import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { Watch } from './types';

export const getWatches = async page => {
  const response = await tower.get(`/watches/?page=${page}`);
  return response.data as Watch[];
};

export const useWatchesQuery = page =>
  useQuery({
    queryKey: ['watches', page],
    queryFn: () => getWatches(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
