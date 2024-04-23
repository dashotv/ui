import {
  DestinationTemplate,
  DestinationTemplateCreate,
  DestinationTemplateDelete,
  DestinationTemplateIndex,
  DestinationTemplateUpdate,
} from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useQueryDestinationTemplates = () => {
  return useQuery<DestinationTemplate[]>({
    queryKey: ['destinationTemplates'],
    queryFn: async () => {
      const response = await DestinationTemplateIndex({ page: 1, limit: 50 });
      return response?.result;
    },
  });
};

export const useMutationDestinationTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: DestinationTemplate }) => {
      return DestinationTemplateUpdate({ id, subject: data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['destinationTemplates'] });
    },
  });
};

export const useMutationDestinationTemplateCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DestinationTemplate) => {
      return DestinationTemplateCreate({ subject: data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['destinationTemplates'] });
    },
  });
};

export const useMutationDestinationTemplateDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return DestinationTemplateDelete({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['destinationTemplates'] });
    },
  });
};
