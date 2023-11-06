import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Log } from 'types/log';

export const getLogs = async (page: number) => {
  const response = await axios.get('/api/tower/messages/');
  return response.data as Log[];
};

export const useLogsQuery = (page: number) =>
  useQuery({
    queryKey: ['logs', page],
    queryFn: () => getLogs(page),
    placeholderData: (previousData, previousQuery) => previousData,
    retry: false,
  });
