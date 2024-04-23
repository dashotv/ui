// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { LibraryTemplate, Response, Setting, towerClient } from '.';

export interface LibraryTemplateIndexRequest {
  page: number;
  limit: number;
}
export interface LibraryTemplateIndexResponse extends Response {
  result: LibraryTemplate[];
  total: number;
}
export const LibraryTemplateIndex = async (params: LibraryTemplateIndexRequest) => {
  const response = await towerClient.get(`/library_template/?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTemplateIndexResponse;
};

export interface LibraryTemplateCreateRequest {
  subject: LibraryTemplate;
}
export interface LibraryTemplateCreateResponse extends Response {
  result: LibraryTemplate;
}
export const LibraryTemplateCreate = async (params: LibraryTemplateCreateRequest) => {
  const response = await towerClient.post(`/library_template/?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTemplateCreateResponse;
};

export interface LibraryTemplateShowRequest {
  id: string;
}
export interface LibraryTemplateShowResponse extends Response {
  result: LibraryTemplate;
}
export const LibraryTemplateShow = async (params: LibraryTemplateShowRequest) => {
  const response = await towerClient.get(`/library_template/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTemplateShowResponse;
};

export interface LibraryTemplateUpdateRequest {
  id: string;
  subject: LibraryTemplate;
}
export interface LibraryTemplateUpdateResponse extends Response {
  result: LibraryTemplate;
}
export const LibraryTemplateUpdate = async (params: LibraryTemplateUpdateRequest) => {
  const response = await towerClient.put(`/library_template/${params.id}?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTemplateUpdateResponse;
};

export interface LibraryTemplateSettingsRequest {
  id: string;
  setting: Setting;
}
export interface LibraryTemplateSettingsResponse extends Response {
  result: LibraryTemplate;
}
export const LibraryTemplateSettings = async (params: LibraryTemplateSettingsRequest) => {
  const response = await towerClient.patch(`/library_template/${params.id}?`, params.setting);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTemplateSettingsResponse;
};

export interface LibraryTemplateDeleteRequest {
  id: string;
}
export interface LibraryTemplateDeleteResponse extends Response {
  result: LibraryTemplate;
}
export const LibraryTemplateDelete = async (params: LibraryTemplateDeleteRequest) => {
  const response = await towerClient.delete(`/library_template/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as LibraryTemplateDeleteResponse;
};
