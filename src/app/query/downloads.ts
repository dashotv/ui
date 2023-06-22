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
