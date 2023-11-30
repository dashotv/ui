import { useEffect, useState } from 'react';

import { useReleases } from './useReleases';
import { useSub } from './useSub';

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

export const useMetrics = () => {
  const [diskfree, setDiskfree] = useState('0.0');
  const [torrents, setTorrents] = useState('0.0');
  const [nzbs, setNzbs] = useState('0.0');

  useSub('flame.metrics', (data: Metrics) => {
    setDiskfree(data.diskspace);
    setTorrents(data.torrents.download_rate);
    setNzbs(data.nzbs.download_rate);
  });

  return { diskfree, torrents, nzbs };
};

export const useReleaseMetrics = (hash: string) => {
  const { torrents, nzbs, nzbStatus } = useReleases();
  const [nzb, setNzb] = useState<boolean>(false);
  const [progress, setProgress] = useState('0.0');
  const [eta, setEta] = useState<Date | undefined>(undefined);
  const [queue, setQueue] = useState('0');
  const [files, setFiles] = useState({ files: 0, total: 0 });
  const [torrentState, setTorrentState] = useState('');

  useEffect(() => {
    if (!torrents) {
      return;
    }
    if (!torrents.has(hash)) {
      return;
    }

    const torrent = torrents.get(hash);
    if (torrent) {
      setProgress(Number(torrent.Progress).toFixed(1));
      setQueue(torrent.Queue.toString());
      setTorrentState(torrent.State);

      if (torrent.Finish > 0) {
        setEta(new Date(Date.now() + torrent.Finish * 1000));
      }

      if (torrent.Files.length <= 1) {
        setFiles({ files: 0, total: 0 });
      } else {
        const finished = torrent.Files.filter(f => f.progress == 100);
        setFiles({ files: torrent.Files.length, total: finished.length });
      }
    }
  }, [torrents]);

  useEffect(() => {
    if (!nzbs || !nzbStatus) {
      return;
    }
    if (!nzbs.has(Number(hash))) {
      return;
    }

    const nzb = nzbs.get(Number(hash));
    if (nzb) {
      setNzb(true);
      setProgress((100.0 - (nzb.RemainingSizeMB / nzb.FileSizeMB) * 100).toFixed(1));
      setQueue(hash);
      if (nzbStatus.DownloadRate > 0) {
        const secs = (nzb.RemainingSizeMB * 1024) / (nzbStatus.DownloadRate / 1024);
        setEta(new Date(Date.now() + secs * 1000));
      }
    }
  });

  return { nzb, progress, eta, queue, files, torrentState };
};
