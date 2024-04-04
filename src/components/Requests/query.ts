import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getRequests = async (page: number, limit: number = 25) => {
  const response = await tower.RequestsIndex({ page, limit });
  return response;
};

export const setRequestStatus = async (r: tower.Request) => {
  if (!r.id) {
    throw new Error('Request ID is required');
  }
  const response = await tower.RequestsUpdate({ id: r.id, subject: r });
  return response;
};

export const useRequestsQuery = (page: number) =>
  useQuery({
    queryKey: ['requests', page],
    queryFn: () => getRequests(page),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useRequestsStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (r: tower.Request) => {
      if (!r.id) {
        throw new Error('Request ID is required');
      }
      return setRequestStatus(r);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
};
