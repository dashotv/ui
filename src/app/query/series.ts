import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getSeriesAll = async page => {
  const response = await axios.get(`/api/tower/series/?page=${page}`);
  return response.data;
};

export const getSeries = async id => {
  const response = await axios.get(`/api/tower/series/${id}`);
  return response.data;
};

export const useSeriesAllQuery = page =>
  useQuery({
    queryKey: ['series', 'all', page],
    queryFn: () => getSeriesAll(page),
    keepPreviousData: true,
    retry: false,
  });

export const useSeriesQuery = id =>
  useQuery({
    queryKey: ['series', id],
    queryFn: () => getSeries(id),
    keepPreviousData: true,
    retry: false,
  });
