import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Setting } from 'types/setting';

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
    keepPreviousData: true,
    retry: false,
  });

export const useMovieQuery = id =>
  useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovie(id),
    keepPreviousData: true,
    retry: false,
  });

export const useMovieSettingMutation = id => {
  const queryClient = useQueryClient();
  return useMutation((setting: Setting) => axios.patch(`/api/tower/movies/${id}`, setting), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies', id] });
    },
  });
};
