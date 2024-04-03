import * as tower from 'client/tower';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Setting } from 'types/setting';

import { DownloadSelection } from './types';

export const getDownloadsActive = async () => {
  const response = await tower.DownloadsIndex({ page: 1, limit: 0 });
  return response.result;
};

export const getDownloadsRecent = async (page: number, medium_id?: string) => {
  const response = await tower.DownloadsRecent({ page, medium_id: medium_id || '' });
  return response;
};

export const getDownload = async (id: string) => {
  const response = await tower.DownloadsShow({ id });
  return response.result;
};

export const getDownloadMedium = async (id: string) => {
  const response = await tower.DownloadsMedium({ id });
  return response.result;
};

export const getDownloadsLast = async () => {
  const response = await tower.DownloadsLast();
  return response.result;
};

export const putDownload = async (id: string, subject: tower.Download) => {
  const response = await tower.DownloadsUpdate({ id, subject });
  return response.result;
};

export const putDownloadSelect = async (id: string, data: DownloadSelection) => {
  const { mediumId: medium_id, num } = data;
  const response = await tower.DownloadsSelect({ id, medium_id, num });
  return response;
};

export const patchDownload = async (id: string, data: Setting) => {
  const response = await tower.DownloadsSettings({ id, setting: { name: data.setting, value: data.value } });
  return response.result;
};

export const createDownload = async (medium_id: string) => {
  const response = await tower.DownloadsCreate({ subject: { medium_id } });
  return response.result;
};

export const useDownloadsActiveQuery = () =>
  useQuery({
    queryKey: ['downloads', 'active'],
    queryFn: () => getDownloadsActive(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useDownloadsLastQuery = () =>
  useQuery({
    queryKey: ['downloads', 'last'],
    queryFn: () => getDownloadsLast(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useDownloadsRecentQuery = (page: number) =>
  useQuery({
    queryKey: ['downloads', 'recent', page],
    queryFn: () => getDownloadsRecent(page),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useDownloadsRecentMediaQuery = (page: number, medium_id: string) =>
  useQuery({
    queryKey: ['downloads', 'medium', medium_id, page],
    queryFn: () => getDownloadsRecent(page, medium_id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useDownloadQuery = id =>
  useQuery({
    queryKey: ['downloads', id],
    queryFn: () => getDownload(id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useDownloadMediumQuery = id =>
  useQuery({
    queryKey: ['downloads', 'medium', id],
    queryFn: () => getDownloadMedium(id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useDownloadMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (download: tower.Download) => {
      return putDownload(id, download);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['downloads', id] });
    },
  });
};

export const useDownloadSettingMutation = id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (setting: Setting) => patchDownload(id, setting),
    onSuccess: async () => {
      console.log('useDownloadSettingMutation:await');
      await queryClient.invalidateQueries({ queryKey: ['downloads', id] });
    },
  });
};

export const useDownloadSelectionMutation = id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (selection: DownloadSelection) => putDownloadSelect(id, selection),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['downloads', id] });
    },
  });
};

export const useDownloadCreateMutation = () => {
  return useMutation({
    mutationFn: (medium_id: string) => createDownload(medium_id),
  });
};
