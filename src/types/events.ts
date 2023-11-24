import { DownloadType } from 'components/Downloads';
import { Log } from 'components/Logs';
import { Episode, Movie, SeriesType } from 'components/Media';
import { Request } from 'components/Requests';

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
  movie: Movie;
}

export interface EventLog extends EventBase {
  log: Log;
}

export interface EventRequest extends EventBase {
  request: Request;
}

export interface EventNotice {
  event: string;
  time: string;
  class: string;
  level: 'warning' | 'error' | 'default' | 'info' | 'success';
  message: string;
}
