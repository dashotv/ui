import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

export const getFeedsAll = async () => {
  const response = await axios.get('/api/tower/feeds/');
  return response.data;
};

export const getFeed = async id => {
  const response = await axios.get(`/api/tower/feeds/${id}`);
  return response.data;
};

export const useFeedsAllQuery = () =>
  useQuery({
    queryKey: ['feeds', 'all'],
    queryFn: () => getFeedsAll(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useFeedQuery = id =>
  useQuery({
    queryKey: ['feeds', id],
    queryFn: () => getFeed(id),
    placeholderData: previousData => previousData,
    retry: false,
  });
