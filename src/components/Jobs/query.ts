import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { Job } from './types';

export const getJobs = async page => {
  const response = await tower.get(`/jobs/?limit=250&page=${page}`);
  return response.data.jobs as Job[];
};

export const queueJob = async (name: string) => {
  const response = await tower.post(`/jobs/?job=${name}`);
  return response.data;
};

export const deleteJob = async (id: string, hard: boolean) => {
  const response = await tower.delete(`/jobs/${id}?hard=${hard}`);
  return response.data;
};

export const useJobsQuery = page =>
  useQuery({
    queryKey: ['jobs', page],
    queryFn: () => getJobs(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
