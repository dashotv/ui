// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { LibraryType, Response, Setting, towerClient } from '.';

export interface LibraryTypeIndexRequest {
  page: number;
  limit: number;
}
export interface LibraryTypeIndexResponse extends Response {
  result: LibraryType[];
  total: number;
}
export const LibraryTypeIndex = async (params: LibraryTypeIndexRequest) => {
  const response = await towerClient.get(`/library_type/?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTypeIndexResponse;
};

export interface LibraryTypeCreateRequest {
  subject: LibraryType;
}
export interface LibraryTypeCreateResponse extends Response {
  result: LibraryType;
}
export const LibraryTypeCreate = async (params: LibraryTypeCreateRequest) => {
  const response = await towerClient.post(`/library_type/?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTypeCreateResponse;
};

export interface LibraryTypeShowRequest {
  id: string;
}
export interface LibraryTypeShowResponse extends Response {
  result: LibraryType;
}
export const LibraryTypeShow = async (params: LibraryTypeShowRequest) => {
  const response = await towerClient.get(`/library_type/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTypeShowResponse;
};

export interface LibraryTypeUpdateRequest {
  id: string;
  subject: LibraryType;
}
export interface LibraryTypeUpdateResponse extends Response {
  result: LibraryType;
}
export const LibraryTypeUpdate = async (params: LibraryTypeUpdateRequest) => {
  const response = await towerClient.put(`/library_type/${params.id}?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTypeUpdateResponse;
};

export interface LibraryTypeSettingsRequest {
  id: string;
  setting: Setting;
}
export interface LibraryTypeSettingsResponse extends Response {
  result: LibraryType;
}
export const LibraryTypeSettings = async (params: LibraryTypeSettingsRequest) => {
  const response = await towerClient.patch(`/library_type/${params.id}?`, params.setting);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTypeSettingsResponse;
};

export interface LibraryTypeDeleteRequest {
  id: string;
}
export interface LibraryTypeDeleteResponse extends Response {
  result: LibraryType;
}
export const LibraryTypeDelete = async (params: LibraryTypeDeleteRequest) => {
  const response = await towerClient.delete(`/library_type/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTypeDeleteResponse;
};
