import { DownloadType } from 'components/Downloads';
import { Log } from 'components/Logs';
import { Episode, SeriesType } from 'components/Media';
import { MovieType } from 'components/Movies';
import { Request } from 'components/Requests';

import { Torrent } from './torrents';

export interface EventBase {
  id: string;
  event: string;
}

export interface EventDownload extends EventBase {
  download: DownloadType;
}

export interface EventEpisode extends EventBase {
  episode: Episode;
}

export interface EventSeries extends EventBase {
  series: SeriesType;
}

export interface EventMovie extends EventBase {
  movie: MovieType;
}

export interface EventLog extends EventBase {
  log: Log;
}
export interface EventStats {
  [key: string]: EventStatsQueue;
}
export interface EventStatsQueue {
  [key: string]: number;
}
export interface EventRequest extends EventBase {
  request: Request;
}

export interface EventNotice {
  event: string;
  time: string;
  class: string;
  level: 'warning' | 'error' | 'info' | 'success';
  message: string;
}

export interface EventDownloading {
  downloads: {
    [key: string]: Downloading;
  };
  hashes: {
    [key: string]: string;
  };
  metrics: Metrics;
}
export interface Downloading {
  id: string;
  medium_id: string;
  multi: boolean;
  infohash: string;
  torrent?: Torrent;
  queue: number;
  progress: number;
  eta: string;
  torrent_state: string;
  files: {
    completed: number;
    selected: number;
  };
}

export interface Metrics {
  diskspace: string;
  torrents: TorrentsMetrics;
  nzbs: NzbsMetrics;
}
export interface TorrentsMetrics {
  download_rate: string;
  upload_rate: string;
}
export interface NzbsMetrics {
  download_rate: string;
}
