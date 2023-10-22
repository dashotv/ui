import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { objectToQueryString } from 'hooks/useQueryString';
import { Medium } from 'types/medium';
import { SearchAllResponse, SearchResponse, SearchResult } from 'types/search';

export const getSearch = async (search: string) => {
  const qs = objectToQueryString({ name: `*${search}*`, limit: 10, type: 'series movie' });
  const response = await axios.get(`/api/scry/media/?${qs}`);
  return response.data.Media as Medium[];
};

export const getSearchAll = async (search: string) => {
  const qs = objectToQueryString({ name: `*${search}*`, q: search, limit: 10, type: 'series movie' });
  const response = await axios.get(`/api/scry/search/?${qs}`);
  return response.data as SearchAllResponse;
};

export const useSearchQuery = (search: string) =>
  useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearch(search),
    placeholderData: (previousData, previousQuery) => previousData,
    retry: false,
  });

export const useSearchAllQuery = (search: string) =>
  useQuery({
    queryKey: ['search', 'all', search],
    queryFn: () => getSearchAll(search),
    placeholderData: (previousData, previousQuery) => previousData,
    retry: false,
  });
