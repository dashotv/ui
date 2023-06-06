import { Medium } from './medium';

export interface Download {
  id: string;
  mediumId: string;
  medium: Medium;
  auto: boolean;
  multi: boolean;
  force: boolean;
  url: string;
  releaseId: string;
  thash: string;
  timestamps: DownloadTimestamps;
  selected: string;
  status: string;
  files: DownloadFile[];
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
  mediumId: string;
  num: number;
}

export interface DownloadEvent {
  id: string;
  event: string;
  download: Download;
}