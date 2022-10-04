import { SearchParams } from './search_params';
import { Path } from './path';

export interface Medium {
  id?: string;
  series_id?: string;
  type?: string;
  kind?: string;
  source?: string;
  source_id?: string;
  title?: string;
  description?: string;
  slug?: string;
  text?: string;
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
  release_date?: Date;
  paths?: Path[];
  cover?: string;
  background?: string;
}
