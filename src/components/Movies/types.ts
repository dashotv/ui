import { Path, Watch } from 'components/Media';

export interface MovieType {
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
