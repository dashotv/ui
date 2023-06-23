import { useCallback, useState } from 'react';

import { useSubscription } from 'components/Nats/useSubscription';
import { Nzb, NzbResponseStatus } from 'types/Nzb';
import { Torrent } from 'types/torrents';

export function useReleases() {
  const [torrents, setTorrents] = useState<Map<string, Torrent> | null>(null);
  const [nzbs, setNzbs] = useState<Map<number, Nzb> | null>(null);
  const [nzbStatus, setNzbStatus] = useState<NzbResponseStatus | null>(null);

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

  return { torrents, nzbs, nzbStatus };
}
