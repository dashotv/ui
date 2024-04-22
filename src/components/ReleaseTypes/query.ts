import { ReleaseType, ReleaseTypeCreate, ReleaseTypeDelete, ReleaseTypeIndex, ReleaseTypeUpdate } from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useQueryReleaseTypes = () => {
  return useQuery<ReleaseType[]>({
    queryKey: ['releaseTypes'],
    queryFn: async () => {
      const response = await ReleaseTypeIndex({ page: 1, limit: 50 });
      return response?.result;
    },
  });
};

export const useMutationReleaseType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ReleaseType }) => {
      return ReleaseTypeUpdate({ id, subject: data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['releaseTypes'] });
    },
  });
};

export const useMutationReleaseTypeCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ReleaseType) => {
      return ReleaseTypeCreate({ subject: data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['releaseTypes'] });
    },
  });
};

export const useMutationReleaseTypeDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return ReleaseTypeDelete({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['releaseTypes'] });
    },
  });
};
