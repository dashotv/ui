import * as tower from 'client/tower';

import { useQuery } from '@tanstack/react-query';

export const getMediaUpcoming = async () => {
  const response = await tower.UpcomingIndex();
  return response;
};

export const useUpcomingQuery = () =>
  useQuery({
    queryKey: ['media', 'upcoming'],
    queryFn: () => getMediaUpcoming(),
    placeholderData: previousData => previousData,
    retry: false,
  });
