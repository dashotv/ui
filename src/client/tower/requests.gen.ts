// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Request, Response, Setting, towerClient } from '.';

export interface RequestsIndexRequest {
  page: number;
  limit: number;
}
export interface RequestsIndexResponse extends Response {
  result: Request[];
  total: number;
}
export const RequestsIndex = async (params: RequestsIndexRequest) => {
  const response = await towerClient.get(`/requests/?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as RequestsIndexResponse;
};

export interface RequestsCreateRequest {
  subject: Request;
}
export interface RequestsCreateResponse extends Response {
  result: Request;
}
export const RequestsCreate = async (params: RequestsCreateRequest) => {
  const response = await towerClient.post(`/requests/?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as RequestsCreateResponse;
};

export interface RequestsShowRequest {
  id: string;
}
export interface RequestsShowResponse extends Response {
  result: Request;
}
export const RequestsShow = async (params: RequestsShowRequest) => {
  const response = await towerClient.get(`/requests/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as RequestsShowResponse;
};

export interface RequestsUpdateRequest {
  id: string;
  subject: Request;
}
export interface RequestsUpdateResponse extends Response {
  result: Request;
}
export const RequestsUpdate = async (params: RequestsUpdateRequest) => {
  const response = await towerClient.put(`/requests/${params.id}?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as RequestsUpdateResponse;
};

export interface RequestsSettingsRequest {
  id: string;
  setting: Setting;
}
export interface RequestsSettingsResponse extends Response {
  result: Request;
}
export const RequestsSettings = async (params: RequestsSettingsRequest) => {
  const response = await towerClient.patch(`/requests/${params.id}?`, params.setting);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as RequestsSettingsResponse;
};

export interface RequestsDeleteRequest {
  id: string;
}
export interface RequestsDeleteResponse extends Response {
  result: Request;
}
export const RequestsDelete = async (params: RequestsDeleteRequest) => {
  const response = await towerClient.delete(`/requests/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as RequestsDeleteResponse;
};
