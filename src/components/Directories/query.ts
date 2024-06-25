import { DirectoryIndex } from 'client/tower';

import { useQuery } from '@tanstack/react-query';

export const useQueryDirectories = (path: string, page: number, limit: number = 50) => {
  return useQuery({
    queryKey: ['directories', path, page],
    queryFn: async () => {
      const response = await DirectoryIndex({ path, page, limit });
      return response;
    },
  });
};
