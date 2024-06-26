import * as scry from 'client/scry';

import { useQuery } from '@tanstack/react-query';

import { Medium } from 'components/Media/types';
import { objectToQueryString } from 'hooks/queryString';
import { SearchAllResponse } from 'types/search';

// export const getSearch = async (search: string) => {
//   const qs = objectToQueryString({ name: `*${search}*`, limit: 10, type: 'series movie' });
//   const response = await scry.get(`/media/?${qs}`);
//   return response.data.Media as Medium[];
// };
//
export const getSearchAll = async (search: string) => {
  const response = await scry.SearchIndex({
    start: 0,
    limit: 10,
    type: 'series movie',
    q: search,
    name: `*${search}*`,
  });
  return response.result;
};

// export const useSearchQuery = (search: string) =>
//   useQuery({
//     queryKey: ['search', search],
//     queryFn: () => getSearch(search),
//     placeholderData: previousData => previousData,
//     retry: false,
//   });

export const useSearchAllQuery = (search: string) =>
  useQuery({
    queryKey: ['search', 'all', search],
    queryFn: () => getSearchAll(search),
    placeholderData: previousData => previousData,
    retry: false,
  });
