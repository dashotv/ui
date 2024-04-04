import * as tower from 'client/tower';

import { useQuery } from '@tanstack/react-query';

import { Watch } from './types';

export const getWatches = async (page: number, mid?: string, user?: string) => {
  const medium_id = mid || '';
  const username = user || '';
  const response = await tower.WatchesIndex({ username, medium_id });
  return response;
};

export const useWatchesQuery = (page: number, medium_id?: string) =>
  useQuery({
    queryKey: ['watches', page, medium_id],
    queryFn: () => getWatches(page, medium_id),
    placeholderData: previousData => previousData,
    retry: false,
  });
