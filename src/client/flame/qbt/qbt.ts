export interface Response {
  DownloadRate: number;
  UploadRate: number;
  Timestamp: Date;
  rid: number;
  Torrents: Torrent[];
}

export interface Torrent {
  Hash: string;
  Status: number;
  State: string;
  Size: number;
  Progress: string;
  Queue: number;
  Name: string;
  Finish: number;
  Files: TorrentFile[];
}

export interface TorrentFile {
  id: number;
  // is_seed: boolean;
  name: string;
  priority: number;
  progress: number;
  size: number;
}
