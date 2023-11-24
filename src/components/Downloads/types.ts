import { Medium } from 'types/medium';
import { TorrentFile } from 'types/torrents';

export type DownloadStatus =
  | 'searching'
  | 'loading'
  | 'managing'
  | 'reviewing'
  | 'downloading'
  | 'done'
  | 'paused'
  | 'deleted'
  | 'held'
  | string;

export interface DownloadType {
  id: string;
  medium_id: string;
  medium: Medium;
  auto: boolean;
  multi: boolean;
  force: boolean;
  url: string;
  release_id: string;
  thash: string;
  timestamps: DownloadTimestamps; // TODO: not used
  selected: string;
  status: DownloadStatus;
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
  torrent_file?: TorrentFile;
  medium?: Medium;
}

export interface DownloadEvent {
  id: string;
  event: string;
  download: DownloadType;
}

export interface DownloadSelection {
  mediumId: number | null;
  num: number;
}
