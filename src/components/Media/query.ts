import { MediumShow } from 'client/tower';

import { useQuery } from '@tanstack/react-query';

export const useQueryMedium = (id: string) => {
  return useQuery({
    queryKey: ['medium', id],
    queryFn: async () => {
      const response = await MediumShow({ id });
      return response;
    },
  });
};
