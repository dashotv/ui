import { scry, tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Setting, SettingsArgs } from 'types/setting';

import { Release, ReleasesResponse } from './types';

export const getReleasesPage = async (page, pagesize, qs) => {
  const start = (page - 1) * pagesize;
  const response = await scry.get(`/releases/?start=${start}&limit=${pagesize}&${qs}`);
  console.log('getReleasesPage:', response);
  return response.data as ReleasesResponse;
};

export const getRelease = async id => {
  const response = await tower.get(`/releases/${id}`);
  return response.data;
};

export const putRelease = async (id: string, release: Release) => {
  const response = await tower.put(`/releases/${id}`, release);
  return response.data;
};

export const patchRelease = async (id: string, setting: Setting) => {
  const response = await tower.patch(`/releases/${id}`, setting);
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

export const useReleaseMutation = id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (release: Release) => putRelease(id, release),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['releases', id] });
    },
  });
};

export const useReleaseSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: SettingsArgs) => patchRelease(args.id, args.setting),
    onSuccess: async (data, args) => {
      await queryClient.invalidateQueries({ queryKey: ['releases', args.id] });
    },
  });
};
