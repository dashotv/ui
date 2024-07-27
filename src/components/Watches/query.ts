import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getWatches = async (page: number, mid?: string, user?: string) => {
  const medium_id = mid || '';
  const username = user || '';
  const response = await tower.WatchesIndex({ username, medium_id });
  return response;
};

export const useWatchesQuery = (page: number, medium_id?: string) =>
  useQuery({
    queryKey: ['watches', page, medium_id],
    queryFn: () => getWatches(page, medium_id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useWatchesCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (watch: { medium_id: string; username?: string }) =>
      tower.WatchesCreate({ username: watch.username || '', medium_id: watch.medium_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['series'] });
    },
  });
};

export const useWatchesDeleteMutation = () =>
  useMutation({
    mutationFn: (id: string) => tower.WatchesDelete({ id }),
  });

export const useWatchesDeleteMediumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (medium_id: string) => tower.WatchesDeleteMedium({ medium_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['series'] });
    },
  });
};
