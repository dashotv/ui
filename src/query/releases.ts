import * as flame from 'client/flame';

import { useMutation } from '@tanstack/react-query';

// export const torrentRemove = async (hash: string) => {
//   const response = await flame.get(`/qbittorrents/remove?infohash=${hash}`);
//   return response.data;
// };
//
// export const torrentWant = async (hash: string, id: number | string) => {
//   const response = await flame.get(`/qbittorrents/want?infohash=${hash}&files=${id}`);
//   return response.data;
// };

export const useTorrentRemoveMutation = () => {
  return useMutation({
    mutationFn: (hash: string) => flame.QbittorrentsRemove({ infohash: hash, del: false }),
  });
};

export const useTorrentWantMutation = () => {
  return useMutation({
    mutationFn: ({ hash, id }: { hash: string; id: number | string }) =>
      flame.QbittorrentsWant({ infohash: hash, files: id.toString() }),
  });
};
