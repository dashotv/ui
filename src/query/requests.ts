import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Request } from 'types/request';

export const getRequests = async (page: number) => {
  const response = await axios.get('/api/tower/requests/?page=' + page);
  return response.data as Request[];
};

export const setRequestStatus = async (r: Request) => {
  const response = await axios.put(`/api/tower/requests/${r.id}`, r);
  return response.data;
};

export const useRequestsQuery = (page: number) =>
  useQuery({
    queryKey: ['requests', page],
    queryFn: () => getRequests(page),
    placeholderData: (previousData, previousQuery) => previousData,
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
