import { FileIndex } from 'client/tower';

import { useQuery } from '@tanstack/react-query';

export const useQueryFiles = (page: number) => {
  return useQuery({
    queryKey: ['files', page],
    queryFn: async () => {
      const response = await FileIndex({ page: page, limit: 50 });
      return response;
    },
  });
};
