import axios from 'axios';
import { tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Download, DownloadSelection } from 'types/download';
import { Setting } from 'types/setting';

axios.interceptors.request.use(config => {
  config.timeout = 10000;
  return config;
});

export const getDownloadsActive = async () => {
  const response = await tower.get('/downloads/');
  return response.data as Download[];
};

export const getDownloadsRecent = async page => {
  const response = await tower.get(`/downloads/recent?page=${page}`);
  return response.data;
};

export const getDownload = async id => {
  const response = await tower.get(`/downloads/${id}`);
  return response.data as Download;
};

export const getDownloadMedium = async id => {
  const response = await tower.get(`/downloads/${id}/medium`);
  return response.data;
};

export const getDownloadsLast = async () => {
  const response = await tower.get('/downloads/last');
  return response.data.last as number;
};

export const putDownload = async (id: string, download: Download) => {
  const response = await tower.put(`/downloads/${id}`, download);
  return response.data;
};
export const putDownloadSelect = async (id, data) => {
  const response = await tower.put(`/downloads/${id}/select`, data);
  return response.data as Download;
};
export const patchDownload = async (id, data) => {
  const response = await tower.patch(`/downloads/${id}`, data);
  return response.data as Download;
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
    mutationFn: (download: Download) => {
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
