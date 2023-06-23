import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Medium } from '../types/medium';

export const getMediaUpcoming = async () => {
  const response = await axios.get('/api/tower/upcoming/');
  console.log('getMediaUpcoming:', response.data);
  return response.data as Medium[];
};

export const useUpcomingQuery = () =>
  useQuery({
    queryKey: ['media', 'upcoming'],
    queryFn: () => getMediaUpcoming(),
    keepPreviousData: true,
    retry: false,
  });
