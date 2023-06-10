export interface TorrentsResponse {
  DownloadRate: number;
  UploadRate: number;
  Timestamp: Date;
  rid: number;
  Torrents: Torrent[];
}

export interface Torrent {
  Hash: string;
  Progress: string;
  Queue: number;
  Name: string;
  Finish: number;
  Files: TorrentFile[];
}

export interface TorrentFile {
  id: number;
  is_send: boolean;
  name: string;
  priority: number;
  progress: number;
  size: number;
}
