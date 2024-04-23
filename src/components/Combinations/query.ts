import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getCombinations = async () => {
  const response = await tower.CombinationsIndex({ page: 1, limit: 0 });
  return response;
};

export const getCombination = async (name: string) => {
  const response = await tower.CombinationsShow({ name });
  return response;
};

export const postCombination = async (subject: tower.Combination) => {
  const response = await tower.CombinationsCreate({ subject });
  return response;
};

export const putCombination = async (subject: tower.Combination) => {
  if (!subject?.id) {
    throw new Error('ID must be set');
  }
  const response = await tower.CombinationsUpdate({ id: subject.id, subject });
  return response;
};

export const deleteCombination = async (id: string) => {
  if (!id) {
    throw new Error('ID must be set');
  }
  const response = await tower.CombinationsDelete({ id });
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

export const useCombinationCreateMutation = () => {
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

export const useCombinationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (v: { id: string; name: string; collections: string[] }) => putCombination(v),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['combinations'] });
    },
    onError: err => {
      throw err;
    },
  });
};

export const useCombinationDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCombination(id),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['combinations'] });
    },
    onError: err => {
      throw err;
    },
  });
};
