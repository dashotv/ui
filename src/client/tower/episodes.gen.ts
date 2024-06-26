// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Episode, Response, Setting, SettingsBatch, towerClient } from '.';

export interface EpisodesSettingsRequest {
  id: string;
  setting: Setting;
}

export const EpisodesSettings = async (params: EpisodesSettingsRequest) => {
  const response = await towerClient.patch(`/episodes/${params.id}?`, params.setting);

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

export interface EpisodesUpdateRequest {
  id: string;
  episode: Episode;
}

export const EpisodesUpdate = async (params: EpisodesUpdateRequest) => {
  const response = await towerClient.put(`/episodes/${params.id}?`, params.episode);

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

export interface EpisodesSettingsBatchRequest {
  settings: SettingsBatch;
}

export const EpisodesSettingsBatch = async (params: EpisodesSettingsBatchRequest) => {
  const response = await towerClient.patch(`/episodes/settings?`, params.settings);

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
