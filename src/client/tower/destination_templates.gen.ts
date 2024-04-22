// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { DestinationTemplate, Response, Setting, towerClient } from '.';

export interface DestinationTemplatesIndexRequest {
  page: number;
  limit: number;
}
export interface DestinationTemplatesIndexResponse extends Response {
  result: DestinationTemplate[];
  total: number;
}
export const DestinationTemplatesIndex = async (params: DestinationTemplatesIndexRequest) => {
  const response = await towerClient.get(`/destination_templates/?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as DestinationTemplatesIndexResponse;
};

export interface DestinationTemplatesCreateRequest {
  subject: DestinationTemplate;
}
export interface DestinationTemplatesCreateResponse extends Response {
  result: DestinationTemplate;
}
export const DestinationTemplatesCreate = async (params: DestinationTemplatesCreateRequest) => {
  const response = await towerClient.post(`/destination_templates/?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as DestinationTemplatesCreateResponse;
};

export interface DestinationTemplatesShowRequest {
  id: string;
}
export interface DestinationTemplatesShowResponse extends Response {
  result: DestinationTemplate;
}
export const DestinationTemplatesShow = async (params: DestinationTemplatesShowRequest) => {
  const response = await towerClient.get(`/destination_templates/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as DestinationTemplatesShowResponse;
};

export interface DestinationTemplatesUpdateRequest {
  id: string;
  subject: DestinationTemplate;
}
export interface DestinationTemplatesUpdateResponse extends Response {
  result: DestinationTemplate;
}
export const DestinationTemplatesUpdate = async (params: DestinationTemplatesUpdateRequest) => {
  const response = await towerClient.put(`/destination_templates/${params.id}?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as DestinationTemplatesUpdateResponse;
};

export interface DestinationTemplatesSettingsRequest {
  id: string;
  setting: Setting;
}
export interface DestinationTemplatesSettingsResponse extends Response {
  result: DestinationTemplate;
}
export const DestinationTemplatesSettings = async (params: DestinationTemplatesSettingsRequest) => {
  const response = await towerClient.patch(`/destination_templates/${params.id}?`, params.setting);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as DestinationTemplatesSettingsResponse;
};

export interface DestinationTemplatesDeleteRequest {
  id: string;
}
export interface DestinationTemplatesDeleteResponse extends Response {
  result: DestinationTemplate;
}
export const DestinationTemplatesDelete = async (params: DestinationTemplatesDeleteRequest) => {
  const response = await towerClient.delete(`/destination_templates/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as DestinationTemplatesDeleteResponse;
};
