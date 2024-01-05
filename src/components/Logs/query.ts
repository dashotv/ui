import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { Log } from './types';

export const getLogs = async (page: number, limit: number = 250) => {
  const response = await tower.get(`/messages/?page=${page}&limit=${limit}`);
  return response.data as Log[];
};

export const useLogsQuery = (page: number, limit: number = 250) =>
  useQuery({
    queryKey: ['logs', page],
    queryFn: () => getLogs(page, limit),
    placeholderData: previousData => previousData,
    retry: false,
  });
