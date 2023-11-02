import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Request } from 'types/request';

export const getRequests = async () => {
  const response = await axios.get('/api/tower/requests/');
  return response.data as Request[];
};

export const useRequestsQuery = () =>
  useQuery({
    queryKey: ['requests'],
    queryFn: () => getRequests(),
    placeholderData: (previousData, previousQuery) => previousData,
    retry: false,
  });
