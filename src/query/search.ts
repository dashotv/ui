import { scry } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { objectToQueryString } from 'hooks/useQueryString';
import { Medium } from 'types/medium';
import { Nzbgeek } from 'types/nzbgeek';
import { SearchAllResponse } from 'types/search';

export const getSearch = async (search: string) => {
  const qs = objectToQueryString({ name: `*${search}*`, limit: 10, type: 'series movie' });
  const response = await scry.get(`/media/?${qs}`);
  return response.data.Media as Medium[];
};

export const getSearchAll = async (search: string) => {
  const qs = objectToQueryString({ name: `*${search}*`, q: search, limit: 10, type: 'series movie' });
  const response = await scry.get(`/search/?${qs}`);
  return response.data as SearchAllResponse;
};

export const nzbSearchTv = async (query: string) => {
  const response = await scry.get(`/nzbs/tv?${query}`);
  return response.data as Nzbgeek[];
};

export const useSearchQuery = (search: string) =>
  useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearch(search),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useSearchAllQuery = (search: string) =>
  useQuery({
    queryKey: ['search', 'all', search],
    queryFn: () => getSearchAll(search),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useNzbSearchTvQuery = (query: string) =>
  useQuery({
    queryKey: ['search', 'nzb', 'tv', query],
    queryFn: () => nzbSearchTv(query),
    placeholderData: previousData => previousData,
    retry: false,
  });
