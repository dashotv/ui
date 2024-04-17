// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Page, Response, Setting, Video, Visit, riftClient } from '.';

export interface PageIndexRequest {
  page: number;
  limit: number;
}
export interface PageIndexResponse extends Response {
  result: Page[];
  total: number;
}
export const PageIndex = async (params: PageIndexRequest) => {
  const response = await riftClient.get(`/page/?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageIndexResponse;
};

export interface PageCreateRequest {
  subject: Page;
}
export interface PageCreateResponse extends Response {
  result: Page;
}
export const PageCreate = async (params: PageCreateRequest) => {
  const response = await riftClient.post(`/page/?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageCreateResponse;
};

export interface PageShowRequest {
  id: string;
}
export interface PageShowResponse extends Response {
  result: Page;
}
export const PageShow = async (params: PageShowRequest) => {
  const response = await riftClient.get(`/page/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageShowResponse;
};

export interface PageUpdateRequest {
  id: string;
  subject: Page;
}
export interface PageUpdateResponse extends Response {
  result: Page;
}
export const PageUpdate = async (params: PageUpdateRequest) => {
  const response = await riftClient.put(`/page/${params.id}?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageUpdateResponse;
};

export interface PageSettingsRequest {
  id: string;
  setting: Setting;
}
export interface PageSettingsResponse extends Response {
  result: Page;
}
export const PageSettings = async (params: PageSettingsRequest) => {
  const response = await riftClient.patch(`/page/${params.id}?`, params.setting);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageSettingsResponse;
};

export interface PageDeleteRequest {
  id: string;
}
export interface PageDeleteResponse extends Response {
  result: Page;
}
export const PageDelete = async (params: PageDeleteRequest) => {
  const response = await riftClient.delete(`/page/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageDeleteResponse;
};

export interface PageVisitsRequest {
  id: string;
  page: number;
  limit: number;
}
export interface PageVisitsResponse extends Response {
  result: Visit[];
}
export const PageVisits = async (params: PageVisitsRequest) => {
  const response = await riftClient.get(`/page/${params.id}/visits?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageVisitsResponse;
};

export interface PageVideosRequest {
  id: string;
  page: number;
  limit: number;
}
export interface PageVideosResponse extends Response {
  result: Video[];
}
export const PageVideos = async (params: PageVideosRequest) => {
  const response = await riftClient.get(`/page/${params.id}/videos?page=${params.page}&limit=${params.limit}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageVideosResponse;
};

export interface PageRefreshRequest {
  id: string;
}
export interface PageRefreshResponse extends Response {
  result: Page;
}
export const PageRefresh = async (params: PageRefreshRequest) => {
  const response = await riftClient.post(`/page/${params.id}/refresh?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as PageRefreshResponse;
};