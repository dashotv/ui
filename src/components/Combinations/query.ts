import { tower } from 'utils/axios';

import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { PlexCollectionChild } from 'components/Plex';

import { Combination } from './types';

export const getCombinations = async () => {
  const response = await tower.get('/combinations/');
  return response.data as Combination[];
};

export const getCombination = async (name: string) => {
  const response = await tower.get(`/combinations/${name}`);
  return response.data as PlexCollectionChild[];
};

export const postCombination = async (v: { name: string; collections: string[] }) => {
  const response = await tower.post('/combinations/', v);
  return response.data;
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
