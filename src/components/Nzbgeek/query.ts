import { scry } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import type { Nzbgeek } from './types';

export const nzbSearchTv = async (query: string) => {
  const response = await scry.get(`/nzbs/tv?${query}`);
  return response.data as Nzbgeek[];
};

export const useNzbSearchTvQuery = (query: string) =>
  useQuery({
    queryKey: ['search', 'nzb', 'tv', query],
    queryFn: () => nzbSearchTv(query),
    placeholderData: previousData => previousData,
    retry: false,
  });
