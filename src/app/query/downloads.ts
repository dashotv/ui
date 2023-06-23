import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Download } from '../../types/download';

export const getDownloadsActive = async () => {
  const response = await axios.get('/api/tower/downloads/');
  console.log('getDownloadsActive:', response.data);
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

export const useDownloadsActiveQuery = () =>
  useQuery({
    queryKey: ['downloads', 'active'],
    queryFn: () => getDownloadsActive(),
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
