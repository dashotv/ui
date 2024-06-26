// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Collection, Response, Setting, towerClient } from '.';

export interface CollectionsIndexRequest {
  page: number;
  limit: number;
}
export interface CollectionsIndexResponse extends Response {
  result: Collection[];
  total: number;
}
export const CollectionsIndex = async (params: CollectionsIndexRequest) => {
  const response = await towerClient.get(`/collections/?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as CollectionsIndexResponse;
};

export interface CollectionsCreateRequest {
  subject: Collection;
}
export interface CollectionsCreateResponse extends Response {
  result: Collection;
}
export const CollectionsCreate = async (params: CollectionsCreateRequest) => {
  const response = await towerClient.post(`/collections/?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as CollectionsCreateResponse;
};

export interface CollectionsShowRequest {
  id: string;
}
export interface CollectionsShowResponse extends Response {
  result: Collection;
}
export const CollectionsShow = async (params: CollectionsShowRequest) => {
  const response = await towerClient.get(`/collections/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as CollectionsShowResponse;
};

export interface CollectionsUpdateRequest {
  id: string;
  subject: Collection;
}
export interface CollectionsUpdateResponse extends Response {
  result: Collection;
}
export const CollectionsUpdate = async (params: CollectionsUpdateRequest) => {
  const response = await towerClient.put(`/collections/${params.id}?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as CollectionsUpdateResponse;
};

export interface CollectionsSettingsRequest {
  id: string;
  setting: Setting;
}
export interface CollectionsSettingsResponse extends Response {
  result: Collection;
}
export const CollectionsSettings = async (params: CollectionsSettingsRequest) => {
  const response = await towerClient.patch(`/collections/${params.id}?`, params.setting);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as CollectionsSettingsResponse;
};

export interface CollectionsDeleteRequest {
  id: string;
}
export interface CollectionsDeleteResponse extends Response {
  result: Collection;
}
export const CollectionsDelete = async (params: CollectionsDeleteRequest) => {
  const response = await towerClient.delete(`/collections/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as CollectionsDeleteResponse;
};
