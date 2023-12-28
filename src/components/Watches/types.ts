import { Medium } from '../Media/types';

export interface Watch {
  id: string;
  username: string;
  player: string;
  medium_id: string;
  medium: Medium;
  watched_at: Date;
  created_at: Date;
  updated_at: Date;
}
