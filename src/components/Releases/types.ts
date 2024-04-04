import { Release } from 'client/tower';

export interface ReleasesResponse {
  Count: number;
  Releases: Release[];
  Total: number;
  Search: string;
}

export interface Popular {
  name: string;
  count: number;
  year?: number;
  type: string;
}

export interface PopularResponse {
  [key: string]: Popular[];
}

// export interface Release {
//   id: string;
//   name?: string;
//   display?: string;
//   type?: string;
//   source?: string;
//   season?: string;
//   episode?: string;
//   group?: string;
//   author?: string;
//   verified?: boolean;
//   nzb?: boolean;
//   title?: string;
//   raw?: string;
//   description?: string;
//   size?: string;
//   view?: string;
//   download?: string;
//   infohash?: string;
//   checksum?: string;
//   tags?: string[];
//   resolution?: number;
//   bluray?: boolean;
//   uncensored?: boolean;
//   created_at?: string;
//   updated_at?: string;
//   published_at?: string;
// }

export interface SearchForm {
  text: string;
  year: string;
  season: number | string;
  episode: number | string;
  group: string;
  author: string;
  resolution: number | string;
  source: string;
  type: string;
  exact: boolean;
  verified: boolean;
  uncensored: boolean;
  bluray: boolean;
}
export interface Feed {
  id: string;
  active: boolean;
  source: string;
  type: string;
  name: string;
  url: string;
  processed?: string;
}
