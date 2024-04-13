import * as scry from 'client/scry';

import { useQuery } from '@tanstack/react-query';

import type { NzbgeekFormMovie, NzbgeekFormTv } from './types';

// export const nzbSearchTv = async (query: string) => {
//   const response = await scry.get(`/nzbs/tv?${query}`);
//   return response.data as Nzbgeek[];
// };
//
// export const nzbSearchMovie = async (query: string) => {
//   const response = await scry.get(`/nzbs/movie?${query}`);
//   return response.data as Nzbgeek[];
// };

export const nzbSearchTv = async (query: NzbgeekFormTv) => {
  const req = {
    tvdbid: query.tvdbid ? query.tvdbid : '',
    season: query.season ? query.season : -1,
    episode: query.episode ? query.episode : -1,
  };
  const response = await scry.NzbsTv(req);
  return response.result;
};

export const nzbSearchMovie = async (query: NzbgeekFormMovie) => {
  const req = {
    imdbid: query.imdbid ? query.imdbid : '',
    tmdbid: '',
  };
  const response = await scry.NzbsMovie(req);
  return response.result;
};

export const useNzbSearchTvQuery = (query: NzbgeekFormTv) =>
  useQuery({
    queryKey: ['search', 'nzb', 'tv', query],
    queryFn: () => nzbSearchTv(query),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useNzbSearchMovieQuery = (query: NzbgeekFormMovie) =>
  useQuery({
    queryKey: ['search', 'nzb', 'movie', query],
    queryFn: () => nzbSearchMovie(query),
    placeholderData: previousData => previousData,
    retry: false,
  });
