import * as tower from 'client/tower';

import { useMutation, useQuery } from '@tanstack/react-query';

export const getCollections = async (page: number) => {
  const response = await tower.CollectionsIndex({ page, limit: 0 });
  return response;
};
export const getCollection = async (id: string) => {
  const response = await tower.CollectionsShow({ id });
  return response;
};
export const postCollection = async (subject: tower.Collection) => {
  const response = await tower.CollectionsCreate({ subject });
  return response;
};
export const putCollection = async (subject: tower.Collection) => {
  if (!subject.id) {
    throw new Error('Collection id is required');
  }
  const response = await tower.CollectionsUpdate({ id: subject.id, subject });
  return response;
};
export const deleteCollection = async (id: string) => {
  const response = await tower.CollectionsDelete({ id });
  return response;
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
    mutationFn: (c: tower.Collection) => putCollection(c),
    retry: false,
  });
