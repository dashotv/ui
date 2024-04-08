import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Option } from './types';

export const createSeries = async (option: Option) => {
  const subject: tower.Series = {
    title: option.Title,
    kind: option.Kind,
    source: option.Source,
    source_id: option.ID,
    description: option.Description,
    release_date: new Date(option.Date).toISOString(),
  };
  const response = await tower.SeriesCreate({ subject });
  return response;
};

export const getSeriesAll = async (page: number, filters) => {
  const kind = filters.kind || '';
  const source = filters.source || '';
  const active = filters.active || false;
  const favorite = filters.favorite || false;
  const broken = filters.broken || false;
  const response = await tower.SeriesIndex({ page, limit: 25, kind, source, active, favorite, broken });
  return response;
};

export const getSeries = async (id: string) => {
  const response = await tower.SeriesShow({ id });
  return response;
};

export const getSeriesSeasonEpisodes = async (id: string, season: string) => {
  const response = await tower.SeriesSeasonEpisodes({ id, season });
  return response;
};

export const getSeriesCovers = async (id: string) => {
  const response = await tower.SeriesCovers({ id });
  return response;
};

export const getSeriesBackgrounds = async (id: string) => {
  const response = await tower.SeriesBackgrounds({ id });
  return response;
};

export const postSeriesJob = async (id: string, name: string) => {
  const response = await tower.SeriesJobs({ id, name });
  return response;
};

export const putSeries = async (id: string, data: tower.Series) => {
  const response = await tower.SeriesUpdate({ id, subject: data });
  return response;
};

export const patchSeries = async (id: string, setting: tower.Setting) => {
  const response = await tower.SeriesSettings({ id, setting });
  return response;
};
export const patchEpisode = async (id: string, setting: tower.Setting) => {
  const response = await tower.EpisodesSettings({ id, setting });
  return response;
};
export const postEpisodeBatchSetting = async (ids: string[], name: string, value: boolean) => {
  const settings: tower.SettingsBatch = { ids, name, value };
  const response = await tower.EpisodesSettingsBatch({ settings });
  return response;
};

export const useSeriesAllQuery = (page: number, filters) =>
  useQuery({
    queryKey: ['series', 'all', page, filters],
    queryFn: () => getSeriesAll(page, filters),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useSeriesQuery = (id: string) =>
  useQuery({
    queryKey: ['series', id],
    queryFn: () => getSeries(id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useSeriesSeasonEpisodesQuery = (id: string, season: string) =>
  useQuery({
    queryKey: ['series', id, 'season', season],
    queryFn: () => getSeriesSeasonEpisodes(id, season),
    placeholderData: previousData => previousData,
    retry: false,
    enabled: season !== null && season !== undefined,
  });

export const useSeriesSettingMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (setting: tower.Setting) => patchSeries(id, setting),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['series', id] });
    },
  });
};

export const useEpisodeSettingMutation = () => {
  return useMutation({
    mutationFn: (args: { id: string; setting: tower.Setting }) => patchEpisode(args.id, args.setting),
  });
};
export const useEpisodeBatchSettingMutation = () => {
  return useMutation({
    mutationFn: ({ ids, field, value }: { ids: string[]; field: string; value: boolean }) =>
      postEpisodeBatchSetting(ids, field, value),
  });
};

export const useSeriesCreateMutation = () => {
  return useMutation({
    mutationFn: (n: Option) => {
      return createSeries(n);
    },
  });
};

export const useSeriesDeleteMutation = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return tower.SeriesDelete({ id });
    },
  });
};
export const useSeriesUpdateMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: tower.Medium) => {
      return putSeries(id, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['series', id] });
    },
  });
};
