import { useState } from 'react';

import { Metrics } from 'types/events';

import { useSub } from './sub';

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
