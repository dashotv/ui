import { Medium } from './medium';

export interface Download {
  id: string;
  medium_id: string;
  medium: Medium;
  auto: boolean;
  multi: boolean;
  force: boolean;
  url: string;
  release_id: string;
  thash: string;
  timestamps: DownloadTimestamps;
  selected: string;
  status: string;
  download_files: DownloadFile[];
  updated_at: string;
  created_at: string;
}

export interface DownloadTimestamps {
  found: string;
  loaded: string;
  downloaded: string;
  completed: string;
  deleted: string;
}

export interface DownloadFile {
  id: string;
  medium_id: string;
  num: number;
}

export interface DownloadEvent {
  id: string;
  event: string;
  download: Download;
}

export interface DownloadSelection {
  mediumId: number;
  num: number;
}
