import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Setting } from 'types/setting';

import { CreateRequest } from './common';

export const createMovie = async (r: CreateRequest) => {
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

export const useMoviesAllQuery = page =>
  useQuery({
    queryKey: ['movies', 'all', page],
    queryFn: () => getMoviesAll(page),
    placeholderData: (previousData, previousQuery) => previousData,
    retry: false,
  });

export const useMovieQuery = id =>
  useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovie(id),
    placeholderData: (previousData, previousQuery) => previousData,
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
    mutationFn: (n: CreateRequest) => createMovie(n),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies', 'all'] });
    },
  });
};
