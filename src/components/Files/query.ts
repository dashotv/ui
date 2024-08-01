import { File, FileList, FileMissing, FileUpdate } from 'client/tower';

import { useMutation, useQuery } from '@tanstack/react-query';

export const useQueryFiles = (page: number, medium_id: string = '', limit: number = 50) => {
  return useQuery({
    queryKey: ['files', page, medium_id],
    queryFn: async () => {
      const response = await FileList({ page, limit, medium_id });
      return response;
    },
  });
};

export const useQueryFilesMissing = (page: number, medium_id: string = '', limit: number = 50) => {
  return useQuery({
    queryKey: ['files', 'missing', page, medium_id],
    queryFn: async () => {
      const response = await FileMissing({ page, limit, medium_id });
      return response;
    },
  });
};

export const useMutationFile = () => {
  return useMutation({
    mutationFn: async (subject: File) => {
      if (!subject.id) {
        throw new Error('id missing');
      }
      const response = await FileUpdate({ id: subject.id, subject });
      return response;
    },
  });
};
