import * as tower from 'client/tower';

import { useQuery } from '@tanstack/react-query';

export const getLogs = async (page: number) => {
  const response = await tower.MessagesIndex({ page, limit: 250 });
  return response.result;
};

export const useLogsQuery = (page: number) =>
  useQuery({
    queryKey: ['logs', page],
    queryFn: () => getLogs(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
