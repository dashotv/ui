import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { Medium } from 'components/Media/types';

export const getMediaUpcoming = async () => {
  const response = await axios.get('/api/tower/upcoming/');
  return response.data as Medium[];
};

export const useUpcomingQuery = () =>
  useQuery({
    queryKey: ['media', 'upcoming'],
    queryFn: () => getMediaUpcoming(),
    placeholderData: previousData => previousData,
    retry: false,
  });
