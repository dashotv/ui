import { useCallback, useState } from 'react';

import { Nzb, NzbResponseStatus } from 'components/Nzbgeek/types';
import { useSub } from 'hooks/useSub';
import { Torrent } from 'types/torrents';

export function useRelease(thash: string) {
  const { torrents, nzbs, nzbStatus, progress, eta, queue, files, torrentState } = useReleases();

  return {
    torrent: torrents?.get(thash),
    nzb: nzbs?.get(Number(thash)),
    nzbStatus,
    progress: progress(thash),
    eta: eta(thash),
    queue: queue(thash),
    files: files(thash),
    torrentState: torrentState(thash),
  };
}

export function useReleases() {
  const [torrents, setTorrents] = useState<Map<string, Torrent> | null>(null);
  const [nzbs, setNzbs] = useState<Map<number, Nzb> | null>(null);
  const [nzbStatus, setNzbStatus] = useState<NzbResponseStatus | null>(null);

  const torrentState = (thash: string) => {
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        return torrent.State;
      }
    }
  };

  const files = (thash: string) => {
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        if (torrent.Files.length <= 1) return { files: 1, total: 0 };
        const finished = torrent.Files.filter(f => f.progress == 100);
        return { files: finished.length, total: torrent.Files.length };
      }
    }
    return { files: 0, total: 0 };
  };

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

  useSub(
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

  useSub(
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

  return { torrents, nzbs, nzbStatus, progress, eta, queue, files, torrentState };
}
