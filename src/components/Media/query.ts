import { tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Setting, SettingsArgs } from 'types/setting';

import { Medium, Option } from './types';

export const createSeries = async (r: Option) => {
  const response = await tower.post(`/series/`, r);
  return response.data;
};

export const getSeriesAll = async (page: number, filters) => {
  const qs = Object.keys(filters)
    .map(key => `${key}=${filters[key]}`)
    .join('&');
  const response = await tower.get(`/series/?page=${page}&${qs}`);
  return response.data;
};

export const getSeries = async id => {
  const response = await tower.get(`/series/${id}`);
  return response.data;
};

export const getSeriesSeasonEpisodes = async (id, season) => {
  const response = await tower.get(`/series/${id}/seasons/${season}`);
  return response.data;
};

export const getSeriesCovers = async id => {
  const response = await tower.get(`/series/${id}/covers`);
  return response.data.covers;
};

export const getSeriesBackgrounds = async id => {
  const response = await tower.get(`/series/${id}/backgrounds`);
  return response.data.backgrounds;
};

export const postSeriesJob = async (id: string, job: string) => {
  const response = await tower.post(`/series/${id}/jobs?name=${job}`);
  return response.data;
};

// export const putSeriesRefresh = async (id: string) => {
//   const response = await tower.put(`/series/${id}/refresh`);
//   return response.data;
// };

export const putSeries = async (id: string, data: Medium) => {
  const response = await tower.put(`/series/${id}`, data);
  return response.data;
};

export const patchSeries = async (id: string, setting: Setting) => {
  const response = await tower.patch(`/series/${id}`, setting);
  return response.data;
};
export const patchEpisode = async (id: string, setting: Setting) => {
  const response = await tower.patch(`/episodes/${id}`, setting);
  return response.data;
};
export const postEpisodeBatchSetting = async (ids: string[], field: string, value: boolean) => {
  const response = await tower.post(`/episodes/settings`, { ids, field, value });
  return response.data;
};

export const useSeriesAllQuery = (page: number, filters) =>
  useQuery({
    queryKey: ['series', 'all', page, filters],
    queryFn: () => getSeriesAll(page, filters),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useSeriesQuery = id =>
  useQuery({
    queryKey: ['series', id],
    queryFn: () => getSeries(id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useSeriesSeasonEpisodesQuery = (id, season) =>
  useQuery({
    queryKey: ['series', id, 'season', season],
    queryFn: () => getSeriesSeasonEpisodes(id, season),
    placeholderData: previousData => previousData,
    retry: false,
    enabled: season !== null && season !== undefined,
  });

export const useSeriesSettingMutation = id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (setting: Setting) => patchSeries(id, setting),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['series', id] });
    },
  });
};

export const useEpisodeSettingMutation = () => {
  return useMutation({
    mutationFn: (args: SettingsArgs) => patchEpisode(args.id, args.setting),
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

export const useSeriesUpdateMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Medium) => {
      return putSeries(id, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['series', id] });
    },
  });
};
