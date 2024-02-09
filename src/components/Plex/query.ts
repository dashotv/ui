import { tower } from 'utils/axios';

import { useMutation, useQuery } from '@tanstack/react-query';

import { objectToQueryString } from 'hooks/queryString';

import { PlexClient, PlexLibrary, PlexSearchResponse } from './types';

export const getLibraries = async () => {
  const response = await tower.get('/plex/libraries');
  return response.data as PlexLibrary[];
};

export const getPlexSearch = async (search: string, library: string) => {
  const qs = objectToQueryString({ query: search, section: library });
  const response = await tower.get(`/plex/search?${qs}`);
  return response.data as PlexSearchResponse[];
};

export const getPlexPlayers = async () => {
  const response = await tower.get(`/plex/resources`);
  return response.data as PlexClient[];
};

export const getPlexPlay = async (player: string, ratingKey: string) => {
  const response = await tower.get(`/plex/play?player=${player}&ratingKey=${ratingKey}`);
  return response.data;
};

export const getPlexStop = async (session: string) => {
  const response = await tower.get(`/plex/stop?session=${session}`);
  return response.data;
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

export const usePlexPlayers = () =>
  useQuery({
    queryKey: ['plex', 'players'],
    queryFn: () => getPlexPlayers(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const usePlexPlayMutation = () =>
  useMutation({
    mutationFn: ({ player, ratingKey }: { player: string; ratingKey: string }) => getPlexPlay(player, ratingKey),
  });

export const usePlexStopMutation = () =>
  useMutation({
    mutationFn: ({ session }: { session: string }) => getPlexStop(session),
  });
