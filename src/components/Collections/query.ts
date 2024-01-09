import { tower } from 'utils/axios';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Collection, CollectionsResponse } from './types';

export const getCollections = async (page: number) => {
  const response = await tower.get(`/collections/?page=${page}`);
  return response.data as CollectionsResponse;
};
export const getCollection = async (id: string) => {
  const response = await tower.get(`/collections/${id}`);
  return response.data as Collection;
};
export const postCollection = async (collection: { name: string; library: string }) => {
  const response = await tower.post('/collections/', collection);
  return response.data;
};
export const putCollection = async (collection: Collection) => {
  const response = await tower.put(`/collections/${collection.id}`, collection);
  return response.data;
};
export const deleteCollection = async (id: string) => {
  const response = await tower.delete(`/collections/${id}`);
  return response.data;
};

export const useCollectionsQuery = (page: number) =>
  useQuery({
    queryKey: ['collections', page],
    queryFn: () => getCollections(page),
    placeholderData: previousData => previousData,
    retry: false,
  });

export const useCollectionMutation = () =>
  useMutation({
    mutationFn: (collection: { name: string; library: string }) => postCollection(collection),
    retry: false,
  });
export const useCollectionDeleteMutation = () =>
  useMutation({
    mutationFn: (id: string) => deleteCollection(id),
    retry: false,
  });
export const useCollectionUpdateMutation = () =>
  useMutation({
    mutationFn: (c: Collection) => putCollection(c),
    retry: false,
  });
