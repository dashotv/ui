import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getReleasesPage = async (page, pagesize, qs) => {
  const start = (page - 1) * pagesize;
  const response = await axios.get(`/api/scry/releases/?start=${start}&limit=${pagesize}&${qs}`);
  console.log('getReleasesPage:', response);
  return response.data;
};

export const getRelease = async id => {
  const response = await axios.get(`/api/scry/releases/${id}`);
  return response.data;
};

export const useReleasesQuery = (start, pagesize, queryString) => {
  return useQuery({
    queryKey: ['releases', start, pagesize, queryString],
    queryFn: () => getReleasesPage(start, pagesize, queryString),
  });
};

export const useReleaseQuery = id => {
  return useQuery({
    queryKey: ['releases', id],
    queryFn: () => getRelease(id),
  });
};
