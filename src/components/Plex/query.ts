import * as tower from 'client/tower';
import * as plex from 'client/tower/plex';

import { useMutation, useQuery } from '@tanstack/react-query';

import { objectToQueryString } from 'hooks/queryString';

import { PlexClient, PlexLibrary, PlexSearchResponse } from './types';

export const getLibraries = async () => {
  const response = await tower.PlexLibraries();
  return response;
};

export const getPlexSearch = async (search: string, library: string) => {
  const response = await tower.PlexSearch({ query: search, section: library });
  return response.result as plex.SearchResponse[];
};

export const getPlexPlayers = async () => {
  const response = await tower.PlexResources();
  return response;
};

export const getPlexPlay = async (player: string, ratingKey: string) => {
  const response = await tower.PlexPlay({ player, ratingKey });
  return response;
};

export const getPlexStop = async (session: string) => {
  const response = await tower.PlexStop({ session });
  return response;
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
