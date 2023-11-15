import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { Job } from 'types/job';

export const getJobs = async page => {
  const response = await axios.get('/api/tower/jobs/?page=' + page);
  return response.data.jobs as Job[];
};

export const useJobsQuery = page =>
  useQuery({
    queryKey: ['jobs', page],
    queryFn: () => getJobs(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
