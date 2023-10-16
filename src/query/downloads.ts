import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Download, DownloadSelection } from 'types/download';
import { Setting } from 'types/setting';

export const getDownloadsActive = async () => {
  const response = await axios.get('/api/tower/downloads/');
  return response.data as Download[];
};

export const getDownloadsRecent = async page => {
  const response = await axios.get(`/api/tower/downloads/recent?page=${page}`);
  return response.data;
};

export const getDownload = async id => {
  const response = await axios.get(`/api/tower/downloads/${id}`);
  return response.data as Download;
};

export const getDownloadMedium = async id => {
  const response = await axios.get(`/api/tower/downloads/${id}/medium`);
  return response.data;
};

export const getDownloadsLast = async () => {
  const response = await axios.get('/api/tower/downloads/last');
  return response.data.last as number;
};

export const useDownloadsActiveQuery = () =>
  useQuery({
    queryKey: ['downloads', 'active'],
    queryFn: () => getDownloadsActive(),
    keepPreviousData: true,
    retry: false,
  });

export const useDownloadsLastQuery = () =>
  useQuery({
    queryKey: ['downloads', 'last'],
    queryFn: () => getDownloadsLast(),
    keepPreviousData: true,
    retry: false,
  });

export const useDownloadsRecentQuery = page =>
  useQuery({
    queryKey: ['downloads', 'recent', page],
    queryFn: () => getDownloadsRecent(page),
    keepPreviousData: true,
    retry: false,
  });

export const useDownloadQuery = id =>
  useQuery({
    queryKey: ['downloads', id],
    queryFn: () => getDownload(id),
    keepPreviousData: true,
    retry: false,
  });

export const useDownloadMediumQuery = id =>
  useQuery({
    queryKey: ['downloads', 'medium', id],
    queryFn: () => getDownloadMedium(id),
    keepPreviousData: true,
    retry: false,
  });

export const useDownloadMutation = id => {
  const queryClient = useQueryClient();
  return useMutation((download: Download) => axios.put(`/api/tower/downloads/${id}`, download), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['downloads', id] });
    },
  });
};

export const useDownloadSettingMutation = id => {
  const queryClient = useQueryClient();
  return useMutation((setting: Setting) => axios.patch(`/api/tower/downloads/${id}`, setting), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['downloads', id] });
    },
  });
};

export const useDownloadSelectionMutation = id => {
  const queryClient = useQueryClient();
  return useMutation((selection: DownloadSelection) => axios.put(`/api/tower/downloads/${id}/select`, selection), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['downloads', id] });
    },
  });
};
