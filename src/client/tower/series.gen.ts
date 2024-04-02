// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Response, Series, Setting, towerClient } from '.';

export interface SeriesIndexRequest {
  page: number;
  limit: number;
}
export interface SeriesIndexResponse extends Response {
  result: Series[];
  total: number;
}
export interface SeriesCreateRequest {
  subject: Series;
}
export interface SeriesCreateResponse extends Response {
  result: Series;
}
export interface SeriesShowRequest {
  id: string;
}
export interface SeriesShowResponse extends Response {
  result: Series;
}
export interface SeriesUpdateRequest {
  id: string;
  subject: Series;
}
export interface SeriesUpdateResponse extends Response {
  result: Series;
}
export interface SeriesSettingsRequest {
  id: string;
  setting: Setting;
}
export interface SeriesSettingsResponse extends Response {
  result: Series;
}
export interface SeriesDeleteRequest {
  id: string;
}
export interface SeriesDeleteResponse extends Response {
  result: Series;
}
export interface SeriesCurrentSeasonRequest {
  id: string;
}

export interface SeriesPathsRequest {
  id: string;
}

export interface SeriesRefreshRequest {
  id: string;
}

export interface SeriesSeasonEpisodesAllRequest {
  id: string;
}

export interface SeriesSeasonEpisodesRequest {
  id: string;
  season: string;
}

export interface SeriesWatchesRequest {
  id: string;
}

export interface SeriesCoversRequest {
  id: string;
}

export interface SeriesBackgroundsRequest {
  id: string;
}

export interface SeriesJobsRequest {
  id: string;
  name: string;
}

export const SeriesIndex = async (params: SeriesIndexRequest) => {
  const response = await towerClient.get(`/series/?page=${params.page}&limit=${params.limit}`);
  return response.data as SeriesIndexResponse;
};
export const SeriesCreate = async (params: SeriesCreateRequest) => {
  const response = await towerClient.post(`/series/?`, params.subject);
  return response.data as SeriesCreateResponse;
};
export const SeriesShow = async (params: SeriesShowRequest) => {
  const response = await towerClient.get(`/series/${params.id}?`);
  return response.data as SeriesShowResponse;
};
export const SeriesUpdate = async (params: SeriesUpdateRequest) => {
  const response = await towerClient.put(`/series/${params.id}?`, params.subject);
  return response.data as SeriesUpdateResponse;
};
export const SeriesSettings = async (params: SeriesSettingsRequest) => {
  const response = await towerClient.patch(`/series/${params.id}?`, params.setting);
  return response.data as SeriesSettingsResponse;
};
export const SeriesDelete = async (params: SeriesDeleteRequest) => {
  const response = await towerClient.delete(`/series/${params.id}?`);
  return response.data as SeriesDeleteResponse;
};
export const SeriesCurrentSeason = async (params: SeriesCurrentSeasonRequest) => {
  const response = await towerClient.get(`/series/${params.id}/currentseason?`);
  return response.data as Response;
};
export const SeriesPaths = async (params: SeriesPathsRequest) => {
  const response = await towerClient.get(`/series/${params.id}/paths?`);
  return response.data as Response;
};
export const SeriesRefresh = async (params: SeriesRefreshRequest) => {
  const response = await towerClient.put(`/series/${params.id}/refresh?`);
  return response.data as Response;
};
export const SeriesSeasonEpisodesAll = async (params: SeriesSeasonEpisodesAllRequest) => {
  const response = await towerClient.get(`/series/${params.id}/seasons/all?`);
  return response.data as Response;
};
export const SeriesSeasonEpisodes = async (params: SeriesSeasonEpisodesRequest) => {
  const response = await towerClient.get(`/series/${params.id}/seasons/${params.season}?`);
  return response.data as Response;
};
export const SeriesWatches = async (params: SeriesWatchesRequest) => {
  const response = await towerClient.get(`/series/${params.id}/watches?`);
  return response.data as Response;
};
export const SeriesCovers = async (params: SeriesCoversRequest) => {
  const response = await towerClient.get(`/series/${params.id}/covers?`);
  return response.data as Response;
};
export const SeriesBackgrounds = async (params: SeriesBackgroundsRequest) => {
  const response = await towerClient.get(`/series/${params.id}/backgrounds?`);
  return response.data as Response;
};
export const SeriesJobs = async (params: SeriesJobsRequest) => {
  const response = await towerClient.post(`/series/${params.id}/jobs?name=${params.name}`);
  return response.data as Response;
};
