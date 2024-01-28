import { tower } from 'utils/axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Setting, SettingsArgs } from 'types/setting';

import { Indexer, IndexersResponse, RunicReadResponse, RunicSourcesResponse } from './types';

export const getRunicSources = async () => {
  const response = await tower.get('/runic/');
  return response.data as RunicSourcesResponse;
};

export const getRunicSource = async (id: string) => {
  const response = await tower.get(`/runic/${id}`);
  return response.data as RunicReadResponse;
};

export const getRunicRead = async (id: string, categories: number[]) => {
  const response = await tower.get(`/runic/${id}/read?categories=${categories.join(',')}`);
  return response.data;
};

export const getIndexersAll = async () => {
  const response = await tower.get('/indexers/');
  return response.data as IndexersResponse;
};

export const getIndexer = async id => {
  const response = await tower.get(`/indexers/${id}`);
  return response.data;
};

export const postIndexer = async (indexer: Indexer) => {
  const response = await tower.post(`/indexers/`, indexer);
  return response.data;
};

export const putIndexer = async (id: string, indexer: Indexer) => {
  const response = await tower.put(`/indexers/${id}`, indexer);
  return response.data;
};

export const patchIndexer = async (id: string, setting: Setting) => {
  const response = await tower.patch(`/indexers/${id}`, setting);
  return response.data;
};

export const deleteIndexer = async (id: string) => {
  const response = await tower.delete(`/indexers/${id}`);
  return response.data;
};

export const useRunicSourcesQuery = () =>
  useQuery({
    queryKey: ['runic', 'sources'],
    queryFn: () => getRunicSources(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useRunicReadQuery = (id: string, categories: number[]) =>
  useQuery({
    queryKey: ['runic', id, 'read', categories],
    queryFn: () => getRunicRead(id, categories),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useIndexersAllQuery = () =>
  useQuery({
    queryKey: ['indexers', 'all'],
    queryFn: () => getIndexersAll(),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useIndexerQuery = id =>
  useQuery({
    queryKey: ['indexers', id],
    queryFn: () => getIndexer(id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useIndexerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (indexer: Indexer) => putIndexer(indexer.id, indexer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['indexers', 'all'] });
    },
  });
};

export const useIndexerCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (indexer: Indexer) => postIndexer(indexer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['indexers', 'all'] });
    },
  });
};

export const useIndexerDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteIndexer(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['indexers', 'all'] });
    },
  });
};

export const useIndexerSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: SettingsArgs) => patchIndexer(args.id, args.setting),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['Indexers', 'all'] });
    },
  });
};
