import { SearchResult } from 'client/scry';
import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const createMovie = async (option: SearchResult) => {
  const subject: tower.Movie = {
    title: option.title,
    kind: option.kind,
    source: option.source,
    source_id: option.id,
    description: option.description,
    release_date: option.date && new Date(option.date).toISOString(),
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

export const getMovieCovers = async (id: string) => {
  const response = await tower.MoviesCovers({ id });
  return response;
};
export const getMovieBackgrounds = async (id: string) => {
  const response = await tower.MoviesBackgrounds({ id });
  return response;
};

export const postMovieJob = async (id: string, name: string) => {
  const response = await tower.MoviesJobs({ id, name });
  return response;
};

export const deleteMovie = async (id: string) => {
  const response = await tower.MoviesDelete({ id });
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
    mutationFn: (n: SearchResult) => createMovie(n),
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

export const useMovieDeleteMutation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteMovie(id),
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ['movies', id] });
    // },
  });
};
