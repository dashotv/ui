import {
  Download as DownloadType,
  Downloading,
  Episode,
  Message as Log,
  Movie as MovieType,
  Request,
  Series as SeriesType,
} from 'client/tower';

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
