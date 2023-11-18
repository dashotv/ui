import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Medium } from 'types/medium';
import { Setting } from 'types/setting';

import { Option } from './option';

export const createMovie = async (r: Option) => {
  const response = await axios.post(`/api/tower/movies/`, r);
  return response.data;
};

export const getMoviesAll = async page => {
  const response = await axios.get(`/api/tower/movies/?page=${page}`);
  return response.data;
};

export const getMovie = async id => {
  const response = await axios.get(`/api/tower/movies/${id}`);
  return response.data;
};

export const putMovie = async (id: string, data: Medium) => {
  const response = await axios.put(`/api/tower/movies/${id}`, data);
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
    mutationFn: (setting: Setting) => axios.patch(`/api/tower/movies/${id}`, setting),
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
