import { scry, tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Setting, SettingsArgs } from 'types/setting';

import { Feed, PopularResponse, Release, ReleasesResponse } from './types';

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

export const getPopular = async (interval: string) => {
  const response = await tower.get(`/releases/popular/${interval}`);
  return response.data as PopularResponse;
};

export const getFeedsAll = async () => {
  const response = await tower.get('/feeds/');
  return response.data;
};

export const getFeed = async id => {
  const response = await tower.get(`/feeds/${id}`);
  return response.data;
};

export const postFeed = async (feed: Feed) => {
  const response = await tower.post(`/feeds/`, feed);
  return response.data;
};

export const putFeed = async (id: string, feed: Feed) => {
  const response = await tower.put(`/feeds/${id}`, feed);
  return response.data;
};

export const patchFeed = async (id: string, setting: Setting) => {
  const response = await tower.patch(`/feeds/${id}`, setting);
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

export const usePopularQuery = (interval: string) =>
  useQuery({
    queryKey: ['releases', 'popular', interval],
    queryFn: () => getPopular(interval),
  });

export const useFeedsAllQuery = () =>
  useQuery({
    queryKey: ['feeds', 'all'],
    queryFn: () => getFeedsAll(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useFeedQuery = id =>
  useQuery({
    queryKey: ['feeds', id],
    queryFn: () => getFeed(id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useFeedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feed: Feed) => putFeed(feed.id, feed),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeds', 'all'] });
    },
  });
};

export const useFeedCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feed: Feed) => postFeed(feed),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeds', 'all'] });
    },
  });
};

export const useFeedSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: SettingsArgs) => patchFeed(args.id, args.setting),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeds', 'all'] });
    },
  });
};
