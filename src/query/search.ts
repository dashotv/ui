import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { objectToQueryString } from 'hooks/useQueryString';
import { Medium } from 'types/medium';

export const getSearch = async search => {
  const qs = objectToQueryString({ name: `*${search}*`, limit: 10, type: 'series movie' });
  const response = await axios.get(`/api/scry/media/?${qs}`);
  return response.data.Media as Medium[];
};

export const useSearchQuery = search =>
  useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearch(search),
    keepPreviousData: true,
    retry: false,
  });
