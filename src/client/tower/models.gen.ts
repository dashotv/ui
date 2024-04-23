import * as qbt from './qbt';

// Code generated by github.com/dashotv/golem. DO NOT EDIT.

export interface Collection {
  id?: string;
  created_at?: string;
  updated_at?: string;

  name?: string;
  library?: string;
  rating_key?: string;
  synced_at?: string;
  media?: CollectionMedia[];
}

export interface CollectionMedia {
  rating_key?: string;
  title?: string;
}

export interface Combination {
  id?: string;
  created_at?: string;
  updated_at?: string;

  name?: string;
  collections?: string[];
}

export interface CombinationChild {
  rating_key?: string;
  key?: string;
  guid?: string;
  type?: string;
  title?: string;
  library_id?: number;
  library_title?: string;
  library_key?: string;
  summary?: string;
  thumb?: string;
  total?: number;
  viewed?: number;
  link?: string;
  next?: string;
  last_viewed_at?: number;
  added_at?: number;
  updated_at?: number;
}

export interface DestinationTemplate {
  id?: string;
  created_at?: string;
  updated_at?: string;

  name?: string;
  template?: string;
}

export interface Download {
  id?: string;
  created_at?: string;
  updated_at?: string;

  medium_id?: string;
  auto?: boolean;
  multi?: boolean;
  force?: boolean;
  url?: string;
  release_id?: string;
  thash?: string;
  selected?: string;
  status?: string;
  files?: DownloadFile[];
  medium?: Medium;
  title?: string;
  display?: string;
  source?: string;
  source_id?: string;
  kind?: string;
  directory?: string;
  active?: boolean;
  favorite?: boolean;
  unwatched?: number;
  cover?: string;
  background?: string;
  search?: DownloadSearch;
}

export interface DownloadFile {
  id?: string;
  medium_id?: string;
  num?: number;
  medium?: Medium;
  torrent_file?: TorrentFile;
}

export interface DownloadSearch {
  type?: string;
  source?: string;
  source_id?: string;
  title?: string;
  year?: number;
  season?: number;
  episode?: number;
  resolution?: number;
  group?: string;
  website?: string;
  exact?: boolean;
  verified?: boolean;
  uncensored?: boolean;
  bluray?: boolean;
  three_d?: boolean;
}

export interface Downloading {
  id?: string;
  medium_id?: string;
  multi?: boolean;
  infohash?: string;
  torrent?: qbt.TorrentJSON;
  queue?: number;
  progress?: number;
  eta?: string;
  torrent_state?: string;
  files?: DownloadingFiles;
  title?: string;
  display?: string;
  cover?: string;
  background?: string;
}

export interface DownloadingFiles {
  completed?: number;
  selected?: number;
}

export interface Episode {
  id?: string;
  created_at?: string;
  updated_at?: string;

  type?: string;
  series_id?: string;
  source_id?: string;
  title?: string;
  description?: string;
  season_number?: number;
  episode_number?: number;
  absolute_number?: number;
  downloaded?: boolean;
  completed?: boolean;
  skipped?: boolean;
  missing?: string;
  release_date?: string;
  paths?: Path[];
  cover?: string;
  background?: string;
  watched?: boolean;
  watched_any?: boolean;
  series_title?: string;
  series_display?: string;
  series_source?: string;
  series_kind?: string;
  series_active?: boolean;
  series_favorite?: boolean;
  series_unwatched?: number;
}

export interface Feed {
  id?: string;
  created_at?: string;
  updated_at?: string;

  name?: string;
  url?: string;
  source?: string;
  type?: string;
  active?: boolean;
  processed?: string;
}

export interface File {
  id?: string;
  created_at?: string;
  updated_at?: string;

  type?: string;
  path?: string;
  size?: number;
  modified_at?: number;
  medium_id?: string;
}

export interface Library {
  id?: string;
  created_at?: string;
  updated_at?: string;

  name?: string;
  path?: string;
  release_type_id?: string;
  destination_template_id?: string;
}

export interface Medium {
  id?: string;
  created_at?: string;
  updated_at?: string;

  type?: string;
  kind?: string;
  source?: string;
  source_id?: string;
  imdb_id?: string;
  title?: string;
  description?: string;
  display?: string;
  directory?: string;
  search?: string;
  search_params?: SearchParams;
  active?: boolean;
  downloaded?: boolean;
  completed?: boolean;
  skipped?: boolean;
  watched?: boolean;
  broken?: boolean;
  favorite?: boolean;
  unwatched?: number;
  release_date?: string;
  paths?: Path[];
  cover?: string;
  background?: string;
  series_id?: string;
  season_number?: number;
  episode_number?: number;
  absolute_number?: number;
}

export interface Message {
  id?: string;
  created_at?: string;
  updated_at?: string;

  level?: string;
  facility?: string;
  message?: string;
}

export interface Movie {
  id?: string;
  created_at?: string;
  updated_at?: string;

  type?: string;
  kind?: string;
  source?: string;
  source_id?: string;
  imdb_id?: string;
  title?: string;
  description?: string;
  slug?: string;
  text?: string[];
  display?: string;
  directory?: string;
  search?: string;
  search_params?: SearchParams;
  active?: boolean;
  downloaded?: boolean;
  completed?: boolean;
  skipped?: boolean;
  watched?: boolean;
  broken?: boolean;
  favorite?: boolean;
  release_date?: string;
  paths?: Path[];
  cover?: string;
  background?: string;
}

export interface NzbgetPayload {
  id?: string;
  name?: string;
  category?: string;
  dir?: string;
  final_dir?: string;
  file?: string;
  status?: string;
}

export interface Path {
  id?: string;
  type?: string;
  remote?: string;
  local?: string;
  extension?: string;
  size?: number;
  resolution?: number;
  bitrate?: number;
  checksum?: string;
  updated_at?: string;
}

export interface Pin {
  id?: string;
  created_at?: string;
  updated_at?: string;

  pin?: number;
  code?: string;
  token?: string;
  product?: string;
  identifier?: string;
}

export interface Popular {
  name?: string;
  year?: number;
  type?: string;
  count?: number;
}

export interface PopularResponse {
  tv?: Popular[];
  anime?: Popular[];
  movies?: Popular[];
}

export interface Release {
  id?: string;
  created_at?: string;
  updated_at?: string;

  type?: string;
  source?: string;
  raw?: string;
  title?: string;
  description?: string;
  size?: string;
  view?: string;
  download?: string;
  infohash?: string;
  name?: string;
  season?: number;
  episode?: number;
  volume?: number;
  year?: number;
  checksum?: string;
  group?: string;
  author?: string;
  verified?: boolean;
  widescreen?: boolean;
  uncensored?: boolean;
  bluray?: boolean;
  nzb?: boolean;
  resolution?: string;
  encoding?: string;
  quality?: string;
  published_at?: string;
}

export interface ReleaseType {
  id?: string;
  created_at?: string;
  updated_at?: string;

  name?: string;
}

export interface Request {
  id?: string;
  created_at?: string;
  updated_at?: string;

  title?: string;
  user?: string;
  type?: string;
  source?: string;
  source_id?: string;
  status?: string;
}

export interface SearchParams {
  type?: string;
  verified?: boolean;
  group?: string;
  author?: string;
  resolution?: number;
  source?: string;
  uncensored?: boolean;
  bluray?: boolean;
}

export interface Series {
  id?: string;
  created_at?: string;
  updated_at?: string;

  type?: string;
  kind?: string;
  source?: string;
  source_id?: string;
  imdb_id?: string;
  title?: string;
  description?: string;
  slug?: string;
  text?: string[];
  display?: string;
  directory?: string;
  search?: string;
  search_params?: SearchParams;
  status?: string;
  active?: boolean;
  downloaded?: boolean;
  completed?: boolean;
  skipped?: boolean;
  watched?: boolean;
  broken?: boolean;
  favorite?: boolean;
  unwatched?: number;
  unwatched_all?: number;
  release_date?: string;
  paths?: Path[];
  cover?: string;
  background?: string;
  currentSeason?: number;
  seasons?: number[];
  episodes?: Episode[];
  watches?: Watch[];
}

export interface TorrentFile {
  id?: number;
  is_send?: boolean;
  name?: string;
  priority?: number;
  progress?: number;
  size?: number;
}

export interface Upcoming {
  id?: string;
  type?: string;
  source_id?: string;
  title?: string;
  display?: string;
  description?: string;
  directory?: string;
  search?: string;
  season_number?: number;
  episode_number?: number;
  absolute_number?: number;
  downloaded?: boolean;
  completed?: boolean;
  skipped?: boolean;
  release_date?: string;
  series_id?: string;
  series_source?: string;
  series_title?: string;
  series_kind?: string;
  series_active?: boolean;
  series_favorite?: boolean;
  series_unwatched?: number;
  series_unwatched_all?: number;
  series_cover?: string;
  series_cover_updated?: string;
  series_background?: string;
  series_background_updated?: string;
}

export interface User {
  id?: string;
  created_at?: string;
  updated_at?: string;

  name?: string;
  email?: string;
  token?: string;
  thumb?: string;
  home?: boolean;
  admin?: boolean;
}

export interface Wanted {
  names?: string[];
  episodes?: string[];
}

export interface Watch {
  id?: string;
  created_at?: string;
  updated_at?: string;

  username?: string;
  player?: string;
  watched_at?: string;
  medium_id?: string;
  medium?: Medium;
}
