import { Path } from './path';
import { SearchParams } from './search_params';

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
  slug?: string;
  text?: string;
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
  release_date?: Date;
  paths?: Path[];
  cover?: string;
  background?: string;
  episode_number?: number;
  season_number?: number;
  absolute_number?: number;
}

export interface MediumEvent {
  event: string;
  id: string;
  episode: Medium;
}
