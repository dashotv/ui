import { FileList } from 'client/tower';

import { useQuery } from '@tanstack/react-query';

export const useQueryFiles = (page: number, medium_id: string = '', limit: number = 50) => {
  return useQuery({
    queryKey: ['files', page, medium_id],
    queryFn: async () => {
      const response = await FileList({ page, limit, medium_id });
      return response;
    },
  });
};
