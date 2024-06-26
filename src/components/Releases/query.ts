import * as scry from 'client/scry';
import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SearchForm } from './types';

export const getReleasesPage = async (page: number, limit: number, search: SearchForm) => {
  const start = (page - 1) * limit;
  const req = {
    start,
    limit,
    text: search.text ? search.text : '',
    year: search.year ? Number(search.year) : -1,
    season: search.season ? Number(search.season) : -1,
    episode: search.episode ? Number(search.episode) : -1,
    group: search.group ? search.group : '',
    author: '',
    type: search.type ? search.type : '',
    source: search.source ? search.source : '',
    resolution: search.resolution ? Number(search.resolution) : -1,
    uncensored: search.uncensored || false,
    bluray: search.bluray || false,
    verified: search.verified || false,
    exact: search.exact || false,
  };
  const response = await scry.ReleasesIndex(req);
  console.log('getReleasesPage:', response);
  return response.result;
};

export const getRelease = async id => {
  const response = await tower.ReleasesShow({ id });
  return response;
};

export const putRelease = async (id: string, subject: tower.Release) => {
  const response = await tower.ReleasesUpdate({ id, subject });
  return response;
};

export const patchRelease = async (id: string, setting: tower.Setting) => {
  const response = await tower.ReleasesSettings({ id, setting });
  return response;
};

export const getPopular = async (interval: string) => {
  const response = await tower.ReleasesPopular({ interval });
  return response;
};

export const getFeedsAll = async (page = 1, limit = 25) => {
  const response = await tower.FeedsIndex({ page, limit });
  return response;
};

export const getFeed = async (id: string) => {
  const response = await tower.FeedsShow({ id });
  return response;
};

export const postFeed = async (subject: tower.Feed) => {
  const response = await tower.FeedsCreate({ subject });
  return response;
};

export const putFeed = async (id: string, subject: tower.Feed) => {
  const response = await tower.FeedsUpdate({ id, subject });
  return response;
};

export const patchFeed = async (id: string, setting: tower.Setting) => {
  const response = await tower.FeedsSettings({ id, setting });
  return response;
};

export const useReleasesQuery = (page, pagesize, queryString) =>
  useQuery({
    queryKey: ['releases', page, pagesize, queryString],
    queryFn: () => getReleasesPage(page, pagesize, queryString),
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
    mutationFn: (release: tower.Release) => putRelease(id, release),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['releases', id] });
    },
  });
};

export const useReleaseSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; setting: tower.Setting }) => patchRelease(args.id, args.setting),
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
    mutationFn: (feed: tower.Feed) => {
      if (!feed.id) {
        throw new Error('Feed id is required');
      }
      return putFeed(feed.id, feed);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeds', 'all'] });
    },
  });
};

export const useFeedCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feed: tower.Feed) => postFeed(feed),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeds', 'all'] });
    },
  });
};

export const useFeedSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; setting: tower.Setting }) => patchFeed(args.id, args.setting),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeds', 'all'] });
    },
  });
};
