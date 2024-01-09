import { tower } from 'utils/axios';

import { useQuery } from '@tanstack/react-query';

import { objectToQueryString } from 'hooks/queryString';

import { PlexLibrary, PlexSearchResponse } from './types';

export const getLibraries = async () => {
  const response = await tower.get('/plex/libraries');
  return response.data as PlexLibrary[];
};

export const getPlexSearch = async (search: string, library: string) => {
  const qs = objectToQueryString({ query: search, section: library });
  const response = await tower.get(`/plex/search?${qs}`);
  return response.data as PlexSearchResponse[];
};

export const usePlexLibrariesQuery = () =>
  useQuery({
    queryKey: ['plex', 'libraries'],
    queryFn: () => getLibraries(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const usePlexSearchQuery = (search: string, library: string) => {
  return useQuery({
    queryKey: ['plex', 'search', search, library],
    queryFn: () => getPlexSearch(search, library),
    placeholderData: previousData => previousData,
    retry: false,
  });
};
