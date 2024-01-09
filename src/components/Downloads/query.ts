import { tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Setting } from 'types/setting';

import { DownloadSelection, DownloadType } from './types';

export const getDownloadsActive = async () => {
  const response = await tower.get('/downloads/');
  return response.data as DownloadType[];
};

export const getDownloadsRecent = async (page: string, medium_id?: string) => {
  const response = await tower.get(`/downloads/recent?page=${page}&medium_id=${medium_id ? medium_id : ''}`);
  return response.data;
};

export const getDownload = async (id: string) => {
  const response = await tower.get(`/downloads/${id}`);
  return response.data as DownloadType;
};

export const getDownloadMedium = async (id: string) => {
  const response = await tower.get(`/downloads/${id}/medium`);
  return response.data;
};

export const getDownloadsLast = async () => {
  const response = await tower.get('/downloads/last');
  return response.data.last as number;
};

export const putDownload = async (id: string, download: DownloadType) => {
  const response = await tower.put(`/downloads/${id}`, download);
  return response.data;
};
export const putDownloadSelect = async (id: string, data: DownloadSelection) => {
  const response = await tower.put(`/downloads/${id}/select`, data);
  return response.data as DownloadType;
};
export const patchDownload = async (id: string, data: Setting) => {
  const response = await tower.patch(`/downloads/${id}`, data);
  return response.data as DownloadType;
};
export const createDownload = async (medium_id: string) => {
  const response = await tower.post(`/downloads/`, { medium_id });
  return response.data;
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

export const useDownloadsRecentQuery = page =>
  useQuery({
    queryKey: ['downloads', 'recent', page],
    queryFn: () => getDownloadsRecent(page),
    placeholderData: previousData => previousData,
    retry: false,
  });
export const useDownloadsRecentMediaQuery = (page: string, medium_id: string) =>
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
    mutationFn: (download: DownloadType) => {
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
