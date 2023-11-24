import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

export const torrentRemove = async (hash: string) => {
  const response = await axios.get(`/api/flame/qbittorrents/remove?infohash=${hash}`);
  return response.data;
};

export const useTorrentRemoveMutation = () => {
  return useMutation({
    mutationFn: (hash: string) => torrentRemove(hash),
  });
};
