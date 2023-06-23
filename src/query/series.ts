import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Setting, SettingsArgs } from '../types/setting';

export const getSeriesAll = async page => {
  const response = await axios.get(`/api/tower/series/?page=${page}`);
  return response.data;
};

export const getSeries = async id => {
  const response = await axios.get(`/api/tower/series/${id}`);
  return response.data;
};

export const getSeriesSeasonEpisodes = async (id, season) => {
  const response = await axios.get(`/api/tower/series/${id}/seasons/${season}`);
  return response.data;
};

export const useSeriesAllQuery = page =>
  useQuery({
    queryKey: ['series', 'all', page],
    queryFn: () => getSeriesAll(page),
    keepPreviousData: true,
    retry: false,
  });

export const useSeriesQuery = id =>
  useQuery({
    queryKey: ['series', id],
    queryFn: () => getSeries(id),
    keepPreviousData: true,
    retry: false,
  });

export const useSeriesSeasonEpisodesQuery = (id, season) =>
  useQuery({
    queryKey: ['series', id, 'season', season],
    queryFn: () => getSeriesSeasonEpisodes(id, season),
    keepPreviousData: true,
    retry: false,
    enabled: season !== null && season !== undefined,
  });

export const useSeriesSettingMutation = id => {
  const queryClient = useQueryClient();
  return useMutation((setting: Setting) => axios.patch(`/api/tower/series/${id}`, setting), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['series', id] });
    },
  });
};

export const useEpisodeSettingMutation = () => {
  // const queryClient = useQueryClient();
  return useMutation(
    (args: SettingsArgs) => {
      const { id, setting } = args;
      return axios.patch(`/api/tower/episodes/${id}`, setting);
    },
    // {
    //   onSuccess: async (data, args) => {
    //     await queryClient.invalidateQueries({ queryKey: ['series', args.id, 'season'] });
    //   },
    // },
  );
};
