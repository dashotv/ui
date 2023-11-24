import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { Job } from './types';

export const getJobs = async page => {
  const response = await tower.get(`/jobs/?page=${page}`);
  return response.data.jobs as Job[];
};

export const useJobsQuery = page =>
  useQuery({
    queryKey: ['jobs', page],
    queryFn: () => getJobs(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
