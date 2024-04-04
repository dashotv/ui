import * as tower from 'client/tower';

import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { PlexCollectionChild } from 'components/Plex';

export const getCombinations = async () => {
  const response = await tower.CombinationsIndex({ page: 1, limit: 0 });
  return response;
};

export const getCombination = async (name: string) => {
  const response = await tower.CombinationsShow({ name });
  return response;
};

export const postCombination = async (v: { name: string; collections: string[] }) => {
  const response = await tower.CombinationsCreate({ subject: v });
  return response;
};

export const useCombinationsQuery = () =>
  useQuery({
    queryKey: ['combinations'],
    queryFn: () => getCombinations(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useCombinationQuery = (name: string) =>
  useQuery({
    queryKey: ['combinations', name],
    queryFn: () => getCombination(name),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useCombinationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (v: { name: string; collections: string[] }) => postCombination(v),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['combinations'] });
    },
    onError: err => {
      throw err;
    },
  });
};
