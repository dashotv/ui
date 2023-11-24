import axios from 'axios';

import { useMutation, useQuery } from '@tanstack/react-query';

export const torrentRemove = async (hash: string) => {
  const response = await axios.get(`/api/flame/qbittorrents/remove?infohash=${hash}`);
  return response.data;
};

export const getPopular = async (interval: string) => {
  const response = await axios.get(`/api/tower/releases/popular/${interval}`);
  return response.data;
};

export const usePopularQuery = (interval: string) =>
  useQuery({
    queryKey: ['releases', 'popular', interval],
    queryFn: () => getPopular(interval),
  });

export const useTorrentRemoveMutation = () => {
  return useMutation({
    mutationFn: (hash: string) => torrentRemove(hash),
  });
};
