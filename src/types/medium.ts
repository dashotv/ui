import { Path } from './path';
import { SearchParams } from './search_params';

export interface MediumEvent {
  event: string;
  id: string;
  episode: Medium;
}
export interface Medium {
  id: string;
  series_id?: string;
  type: string;
  kind?: string;
  source?: string;
  source_id?: string;
  title: string;
  name: string;
  description?: string;
  display?: string;
  directory?: string;
  search?: string;
  search_params?: SearchParams;
  active?: boolean;
  favorite?: boolean;
  downloaded?: boolean;
  completed?: boolean;
  skipped?: boolean;
  watched?: boolean;
  broken?: boolean;
  unwatched?: number;
  release_date?: string;
  paths?: Path[];
  cover?: string;
  background?: string;
  episode_number?: number;
  season_number?: number;
  absolute_number?: number;
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: string;
  series_id: string;
  type: string;
  title: string;
  name: string;
  display?: string;
  description?: string;
  episode_number?: number;
  season_number?: number;
  absolute_number?: number;
  downloaded?: boolean;
  completed?: boolean;
  skipped?: boolean;
  broken?: boolean;
  release_date?: Date;
  paths?: Path[];
  created_at: string;
  updated_at: string;
}

export interface Series {
  id: string;
  type: string;
  kind: string;
  source: string;
  source_id: string;
  title: string;
  name: string;
  description?: string;
  display?: string;
  directory?: string;
  search?: string;
  search_params: SearchParams;
  active: boolean;
  favorite: boolean;
  broken: boolean;
  unwatched: number;
  release_date: string;
  paths: Path[];
  cover: string;
  background: string;
  seasons: number[];
  watches: Watch[];
  created_at: string;
  updated_at: string;
}

export interface Movie {
  id: string;
  type: string;
  kind: string;
  source: string;
  source_id: string;
  title: string;
  name: string;
  description?: string;
  display?: string;
  directory?: string;
  search?: string;
  broken: boolean;
  downloaded: boolean;
  completed: boolean;
  release_date: string;
  paths: Path[];
  cover?: string;
  background?: string;
  watches: Watch[];
  created_at: string;
  updated_at: string;
}
export interface Watch {
  id: string;
  username: string;
  player: string;
  watched_at: Date;
  medium_id: string;
  medium?: Medium;
  created_at: string;
  updated_at: string;
}
