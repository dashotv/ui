import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getSeriesAll = async () => {
  const response = await axios.get('/api/tower/series/');
  return response.data;
};
