import { flame } from 'utils/axios';

import { useMutation } from '@tanstack/react-query';

export const torrentRemove = async (hash: string) => {
  const response = await flame.get(`/qbittorrents/remove?infohash=${hash}`);
  return response.data;
};

export const torrentWant = async (hash: string, id: number | string) => {
  const response = await flame.get(`/qbittorrents/want?infohash=${hash}&files=${id}`);
  return response.data;
};

export const useTorrentRemoveMutation = () => {
  return useMutation({
    mutationFn: (hash: string) => torrentRemove(hash),
  });
};

export const useTorrentWantMutation = () => {
  return useMutation({
    mutationFn: ({ hash, id }: { hash: string; id: number | string }) => torrentWant(hash, id),
  });
};
