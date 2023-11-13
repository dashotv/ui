import { useCallback, useState } from 'react';

import { useSubscription } from 'components/Nats/useSubscription';
import { Nzb, NzbResponseStatus } from 'types/Nzb';
import { Torrent } from 'types/torrents';

export function useReleases() {
  const [torrents, setTorrents] = useState<Map<string, Torrent> | null>(null);
  const [nzbs, setNzbs] = useState<Map<number, Nzb> | null>(null);
  const [nzbStatus, setNzbStatus] = useState<NzbResponseStatus | null>(null);

  const progress = (thash: string) => {
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        return Number(torrent.Progress);
      }
    }

    if (nzbs != null) {
      const nzb = nzbs.get(Number(thash));
      if (nzb) {
        return 100.0 - (nzb.RemainingSizeMB / nzb.FileSizeMB) * 100;
      }
    }
  };

  const eta = (thash: string) => {
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        if (torrent.Finish > 0) return new Date(Date.now() + torrent.Finish * 1000);
      }
    }

    if (nzbs != null) {
      const nzb = nzbs.get(Number(thash));
      if (nzb && nzb !== undefined && nzbStatus && nzbStatus !== undefined) {
        if (nzbStatus.DownloadRate > 0) {
          const secs = (nzb.RemainingSizeMB * 1024) / (nzbStatus.DownloadRate / 1024);
          return new Date(Date.now() + secs * 1000);
        }
      }
    }

    return null;
  };

  const queue = (thash: string) => {
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        return torrent.Queue;
      }
    }

    if (nzbs != null) {
      const nzb = nzbs.get(Number(thash));
      if (nzb) {
        return nzb.nzbid;
      }
    }
  };

  useSubscription(
    'flame.qbittorrents',
    useCallback(
      data => {
        const index = new Map<string, Torrent>();
        if (data.Torrents.length > 0) {
          for (const t of data.Torrents) {
            index.set(t.Hash, t);
          }
        }
        setTorrents(index);
      },
      [setTorrents],
    ),
  );

  useSubscription(
    'flame.nzbs',
    useCallback(
      data => {
        const index = new Map<number, Nzb>();
        if (data.Result.length > 0) {
          for (const t of data.Result) {
            index.set(t.nzbid, t);
          }
        }
        setNzbs(index);
        setNzbStatus(data.Status);
      },
      [setNzbs, setNzbStatus],
    ),
  );

  return { torrents, nzbs, nzbStatus, progress, eta, queue };
}
