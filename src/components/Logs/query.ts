import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { Log } from './types';

export const getLogs = async (page: number) => {
  const response = await tower.get(`/messages/?page=${page}`);
  return response.data as Log[];
};

export const useLogsQuery = (page: number) =>
  useQuery({
    queryKey: ['logs', page],
    queryFn: () => getLogs(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
