// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Response, flameClient } from '.';
import * as qbt from './qbt';

export interface QbittorrentsIndexResponse extends Response {
  result: qbt.Response;
  total: number;
}
export const QbittorrentsIndex = async () => {
  const response = await flameClient.get(`/qbittorrents/?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as QbittorrentsIndexResponse;
};

export interface QbittorrentsAddRequest {
  url: string;
}
export interface QbittorrentsAddResponse extends Response {
  result: string;
}
export const QbittorrentsAdd = async (params: QbittorrentsAddRequest) => {
  const response = await flameClient.get(`/qbittorrents/add?url=${params.url}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as QbittorrentsAddResponse;
};

export interface QbittorrentsRemoveRequest {
  infohash: string;
  del: boolean;
}

export const QbittorrentsRemove = async (params: QbittorrentsRemoveRequest) => {
  const response = await flameClient.get(`/qbittorrents/remove?infohash=${params.infohash}&del=${params.del}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export interface QbittorrentsPauseRequest {
  infohash: string;
}

export const QbittorrentsPause = async (params: QbittorrentsPauseRequest) => {
  const response = await flameClient.get(`/qbittorrents/pause?infohash=${params.infohash}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export interface QbittorrentsResumeRequest {
  infohash: string;
}

export const QbittorrentsResume = async (params: QbittorrentsResumeRequest) => {
  const response = await flameClient.get(`/qbittorrents/resume?infohash=${params.infohash}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export interface QbittorrentsLabelRequest {
  infohash: string;
  label: string;
}

export const QbittorrentsLabel = async (params: QbittorrentsLabelRequest) => {
  const response = await flameClient.get(`/qbittorrents/label?infohash=${params.infohash}&label=${params.label}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export interface QbittorrentsWantRequest {
  infohash: string;
  files: string;
}

export const QbittorrentsWant = async (params: QbittorrentsWantRequest) => {
  const response = await flameClient.get(`/qbittorrents/want?infohash=${params.infohash}&files=${params.files}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export interface QbittorrentsWantedRequest {
  infohash: string;
}

export const QbittorrentsWanted = async (params: QbittorrentsWantedRequest) => {
  const response = await flameClient.get(`/qbittorrents/wanted?infohash=${params.infohash}`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};
