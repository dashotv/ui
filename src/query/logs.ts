import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { Log } from 'types/log';

export const getLogs = async (page: number) => {
  const response = await axios.get('/api/tower/messages/?page=' + page);
  return response.data as Log[];
};

export const useLogsQuery = (page: number) =>
  useQuery({
    queryKey: ['logs', page],
    queryFn: () => getLogs(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
