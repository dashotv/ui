import { useState } from 'react';

import { useSub } from 'hooks/useSub';

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
