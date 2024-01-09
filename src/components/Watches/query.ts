import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { Watch } from './types';

export const getWatches = async (page: number, medium_id?: string) => {
  const response = await tower.get(`/watches/?page=${page}&medium_id=${medium_id ? medium_id : ''}`);
  return response.data as Watch[];
};

export const useWatchesQuery = (page: number, medium_id?: string) =>
  useQuery({
    queryKey: ['watches', page, medium_id],
    queryFn: () => getWatches(page, medium_id),
    placeholderData: previousData => previousData,
    retry: false,
  });
