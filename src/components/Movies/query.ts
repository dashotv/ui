import { tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Medium, Option } from 'components/Media';
import { Setting } from 'types/setting';

export const createMovie = async (r: Option) => {
  const response = await tower.post(`/movies/`, r);
  return response.data;
};

export const getMoviesAll = async page => {
  const response = await tower.get(`/movies/?page=${page}`);
  return response.data;
};

export const getMovie = async id => {
  const response = await tower.get(`/movies/${id}`);
  return response.data;
};

export const putMovie = async (id: string, data: Medium) => {
  const response = await tower.put(`/movies/${id}`, data);
  return response.data;
};

export const putMovieRefresh = async (id: string) => {
  const response = await tower.put(`/movies/${id}/refresh`);
  return response.data;
};

export const patchMovie = async (id: string, setting: Setting) => {
  const response = await tower.patch(`/movies/${id}`, setting);
  return response.data;
};

export const useMoviesAllQuery = page =>
  useQuery({
    queryKey: ['movies', 'all', page],
    queryFn: () => getMoviesAll(page),
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
    mutationFn: (setting: Setting) => patchMovie(id, setting),
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
    mutationFn: (data: Medium) => putMovie(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies', id] });
    },
  });
};
