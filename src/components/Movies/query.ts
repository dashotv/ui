import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Medium, Option } from 'components/Media';
import { Setting } from 'types/setting';

export const createMovie = async (option: Option) => {
  const subject: tower.Movie = {
    title: option.Title,
    kind: option.Kind,
    source: option.Source,
    source_id: option.ID,
    description: option.Description,
    release_date: new Date(option.Date).toISOString(),
  };
  const response = await tower.MoviesCreate({ subject });
  return response;
};

export const getMoviesAll = async (page: number, filters) => {
  const kind = filters.kind || '';
  const source = filters.source || '';
  const completed = filters.completed || false;
  const downloaded = filters.downloaded || false;
  const broken = filters.broken || false;
  const response = await tower.MoviesIndex({ page, limit: 25, kind, source, downloaded, completed, broken });
  return response;
};

export const getMovie = async id => {
  const response = await tower.MoviesShow({ id });
  return response;
};

export const putMovie = async (id: string, subject: tower.Movie) => {
  const response = await tower.MoviesUpdate({ id, subject });
  return response;
};

export const putMovieRefresh = async (id: string) => {
  const response = await tower.MoviesRefresh({ id });
  return response;
};

export const patchMovie = async (id: string, setting: tower.Setting) => {
  const response = await tower.MoviesSettings({ id, setting });
  return response;
};

export const useMoviesAllQuery = (page: number, filters) =>
  useQuery({
    queryKey: ['movies', 'all', page, filters],
    queryFn: () => getMoviesAll(page, filters),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useMovieQuery = id =>
  useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovie(id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useMovieSettingMutation = id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (setting: tower.Setting) => patchMovie(id, setting),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies', id] });
    },
  });
};

export const useMovieCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (n: Option) => createMovie(n),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies', 'all'] });
    },
  });
};

export const useMovieUpdateMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: tower.Movie) => putMovie(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies', id] });
    },
  });
};
