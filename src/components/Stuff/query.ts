import { tower } from 'utils/axios';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Child, PlexPlayer } from './types';

export const getPlexStuff = async () => {
  const response = await tower.get(`/plex/stuff`);
  console.log(response.data);
  return response.data as Child[];
};

export const getPlexPlayers = async () => {
  const response = await tower.get(`/plex/resources`);
  return response.data as PlexPlayer[];
};

export const getPlexPlay = async (player: string, ratingKey: string) => {
  const response = await tower.get(`/plex/play?player=${player}&ratingKey=${ratingKey}`);
  return response.data;
};

export const usePlexStuff = () =>
  useQuery({
    queryKey: ['plex', 'stuff'],
    queryFn: () => getPlexStuff(),
    placeholderData: previousData => previousData,
    retry: false,
  });

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
