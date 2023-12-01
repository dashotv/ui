import { tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Request } from './types';

export const getRequests = async (page: number) => {
  const response = await tower.get(`/requests/?page=${page}`);
  return response.data as Request[];
};

export const setRequestStatus = async (r: Request) => {
  const response = await tower.put(`/requests/${r.id}`, r);
  return response.data;
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
    mutationFn: (r: Request) => {
      return setRequestStatus(r);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
};
