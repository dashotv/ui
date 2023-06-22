import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Download } from '../../types/download';

export const getDownloadsActive = async () => {
  const response = await axios.get('/api/tower/downloads/');
  console.log('getDownloadsActive:', response.data);
  return response.data as Download[];
};

export const getDownload = async id => {
  const response = await axios.get(`/api/tower/downloads/${id}`);
  return response.data as Download;
};

export const useDownloadsQuery = () =>
  useQuery({
    queryKey: ['downloads', 'active'],
    queryFn: () => getDownloadsActive(),
    keepPreviousData: true,
    retry: false,
  });
