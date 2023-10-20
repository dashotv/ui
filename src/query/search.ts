import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { objectToQueryString } from 'hooks/useQueryString';
import { Medium } from 'types/medium';
import { TmdbResult } from 'types/tmdb';
import { TvdbResult } from 'types/tvdb';

export const getSearch = async search => {
  const qs = objectToQueryString({ name: `*${search}*`, limit: 10, type: 'series movie' });
  const response = await axios.get(`/api/scry/media/?${qs}`);
  return response.data.Media as Medium[];
};

export const getTvdbSearch = async search => {
  if (!search) return [] as TvdbResult[];
  const qs = objectToQueryString({ q: search });
  const response = await axios.get(`/api/scry/tvdb/?${qs}`);
  return response.data.tvdb as TvdbResult[];
}

export const getTmdbSearch = async search => {
  if (!search) return [] as TmdbResult[];
  const qs = objectToQueryString({ q: search });
  const response = await axios.get(`/api/scry/tmdb/?${qs}`);
  return response.data.tmdb as TmdbResult[];
}

export const useSearchQuery = search =>
  useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearch(search),
    keepPreviousData: true,
    retry: false,
  });

export const useTvdbSearchQuery = search =>
  useQuery({
    queryKey: ['tvdb', search],
    queryFn: () => getTvdbSearch(search),
    keepPreviousData: true,
    retry: false,
  });

export const useTmdbSearchQuery = search =>
  useQuery({
    queryKey: ['tmdb', search],
    queryFn: () => getTmdbSearch(search),
    keepPreviousData: true,
    retry: false,
  });
