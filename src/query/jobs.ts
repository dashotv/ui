import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Job } from 'types/job';

export const getJobs = async (page) => {
    const response = await axios.get('/api/tower/jobs/');
    return response.data.jobs as Job[];
};

export const useJobsQuery = (page) =>
  useQuery({
    queryKey: ['jobs', page],
    queryFn: () => getJobs(page),
    keepPreviousData: true,
    retry: false,
  });
