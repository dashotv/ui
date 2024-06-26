// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Movie, Path, Response, Setting, towerClient } from '.';

export interface MoviesIndexRequest {
  page: number;
  limit: number;
  kind: string;
  source: string;
  downloaded: boolean;
  completed: boolean;
  broken: boolean;
}
export interface MoviesIndexResponse extends Response {
  result: Movie[];
  total: number;
}
export const MoviesIndex = async (params: MoviesIndexRequest) => {
  const response = await towerClient.get(
    `/movies/?page=${params.page}&limit=${params.limit}&kind=${params.kind}&source=${params.source}&downloaded=${params.downloaded}&completed=${params.completed}&broken=${params.broken}`,
  );

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesIndexResponse;
};

export interface MoviesCreateRequest {
  subject: Movie;
}
export interface MoviesCreateResponse extends Response {
  result: Movie;
}
export const MoviesCreate = async (params: MoviesCreateRequest) => {
  const response = await towerClient.post(`/movies/?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesCreateResponse;
};

export interface MoviesShowRequest {
  id: string;
}
export interface MoviesShowResponse extends Response {
  result: Movie;
}
export const MoviesShow = async (params: MoviesShowRequest) => {
  const response = await towerClient.get(`/movies/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesShowResponse;
};

export interface MoviesUpdateRequest {
  id: string;
  subject: Movie;
}
export interface MoviesUpdateResponse extends Response {
  result: Movie;
}
export const MoviesUpdate = async (params: MoviesUpdateRequest) => {
  const response = await towerClient.put(`/movies/${params.id}?`, params.subject);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesUpdateResponse;
};

export interface MoviesSettingsRequest {
  id: string;
  setting: Setting;
}

export const MoviesSettings = async (params: MoviesSettingsRequest) => {
  const response = await towerClient.patch(`/movies/${params.id}?`, params.setting);

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

export interface MoviesDeleteRequest {
  id: string;
}
export interface MoviesDeleteResponse extends Response {
  result: Movie;
}
export const MoviesDelete = async (params: MoviesDeleteRequest) => {
  const response = await towerClient.delete(`/movies/${params.id}?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesDeleteResponse;
};

export interface MoviesRefreshRequest {
  id: string;
}

export const MoviesRefresh = async (params: MoviesRefreshRequest) => {
  const response = await towerClient.put(`/movies/${params.id}/refresh?`);

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

export interface MoviesPathsRequest {
  id: string;
}
export interface MoviesPathsResponse extends Response {
  result: Path[];
}
export const MoviesPaths = async (params: MoviesPathsRequest) => {
  const response = await towerClient.get(`/movies/${params.id}/paths?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesPathsResponse;
};

export interface MoviesJobsRequest {
  id: string;
  name: string;
}

export const MoviesJobs = async (params: MoviesJobsRequest) => {
  const response = await towerClient.post(`/movies/${params.id}/jobs?name=${params.name}`);

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

export interface MoviesCoversRequest {
  id: string;
}
export interface MoviesCoversResponse extends Response {
  result: string[];
}
export const MoviesCovers = async (params: MoviesCoversRequest) => {
  const response = await towerClient.get(`/movies/${params.id}/covers?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesCoversResponse;
};

export interface MoviesBackgroundsRequest {
  id: string;
}
export interface MoviesBackgroundsResponse extends Response {
  result: string[];
}
export const MoviesBackgrounds = async (params: MoviesBackgroundsRequest) => {
  const response = await towerClient.get(`/movies/${params.id}/backgrounds?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as MoviesBackgroundsResponse;
};
