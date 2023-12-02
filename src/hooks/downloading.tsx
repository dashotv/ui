import { useState } from 'react';

import { Downloading, EventDownloading } from 'types/events';

import { useSub } from './sub';

export const useDownloadingId = (id: string) => {
  const { get } = useDownloading();
  const downloading = get(id);
  return downloading;
};

export const useDownloading = () => {
  const [def] = useState<Downloading>({
    id: '',
    infohash: '',
    medium_id: '',
    multi: false,
    progress: 0,
    eta: '',
    queue: 0,
    files: { completed: 0, selected: 0 },
    torrent_state: 'unknown',
  });
  const [event, setEvent] = useState<EventDownloading | null>(null);

  useSub('tower.downloading', (data: EventDownloading) => {
    // console.log('tower.downloading', data);
    setEvent(data);
  });

  const get = (id_or_thash: string): Downloading => {
    if (!event) {
      return def;
    }
    if (event.hashes && event.hashes[id_or_thash]) {
      return hash(id_or_thash);
    }
    if (event.downloads && event.downloads[id_or_thash]) {
      return download(id_or_thash);
    }
    return def;
  };

  const download = (id: string): Downloading => {
    if (!event) {
      return def;
    }
    if (!id) {
      return def;
    }
    return event.downloads[id];
  };

  const hash = (hash: string): Downloading => {
    if (!event) {
      return def;
    }

    const id = event?.hashes[hash];
    if (!id) {
      return def;
    }

    return download(id);
  };

  return { get, event, download, hash };
};
