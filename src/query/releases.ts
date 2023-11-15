import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Release } from 'types/release';
import { SettingsArgs } from 'types/setting';

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

export const getPopular = async (interval: string) => {
  const response = await axios.get(`/api/tower/releases/popular/${interval}`);
  return response.data;
};

export const useReleasesQuery = (start, pagesize, queryString) =>
  useQuery({
    queryKey: ['releases', start, pagesize, queryString],
    queryFn: () => getReleasesPage(start, pagesize, queryString),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useReleaseQuery = id =>
  useQuery({
    queryKey: ['releases', id],
    queryFn: () => getRelease(id),
  });

export const usePopularQuery = (interval: string) =>
  useQuery({
    queryKey: ['releases', 'popular', interval],
    queryFn: () => getPopular(interval),
  });

export const useReleaseMutation = id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (release: Release) => axios.put(`/api/tower/releases/${id}`, release),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['releases', id] });
    },
  });
};

export const useReleaseSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: SettingsArgs) => axios.patch(`/api/tower/releases/${args.id}`, args.setting),
    onSuccess: async (data, args) => {
      await queryClient.invalidateQueries({ queryKey: ['releases', args.id] });
    },
  });
};
