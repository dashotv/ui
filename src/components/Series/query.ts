import { SearchResult } from 'client/scry';
import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const createSeries = async (option: SearchResult) => {
  const subject: tower.Series = {
    title: option.title,
    kind: option.kind,
    source: option.source,
    source_id: option.id,
    description: option.description,
    release_date: option.date && new Date(option.date).toISOString(),
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

export const useSeriesCreateMutation = () => {
  return useMutation({
    mutationFn: (n: SearchResult) => {
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
