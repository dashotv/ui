import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Release } from '../../types/release';

export interface ReleasesResponse {
  Count: number;
  Releases: Release[];
  Total: number;
  Search: string;
}

export const getReleasesPage = async (page, pagesize, qs) => {
  const start = (page - 1) * pagesize;
  const response = await axios.get(`/api/scry/releases/?start=${start}&limit=${pagesize}&${qs}`);
  console.log('getReleasesPage:', response);
  return response.data as ReleasesResponse;
};

export const getRelease = async id => {
  const response = await axios.get(`/api/tower/releases/${id}`);
  return response.data;
};

export const useReleasesQuery = (start, pagesize, queryString) =>
  useQuery({
    queryKey: ['releases', start, pagesize, queryString],
    queryFn: () => getReleasesPage(start, pagesize, queryString),
    keepPreviousData: true,
    retry: false,
  });

export const useReleaseQuery = id =>
  useQuery({
    queryKey: ['releases', id],
    queryFn: () => getRelease(id),
  });
