import { Subscription } from 'nats.ws';
import { useCallback, useEffect, useState } from 'react';

import { NzbResponse } from '../../../types/Nzb';
import { TorrentsResponse } from '../../../types/torrents';
import { useNats } from '../Nats/usenats';
import { DiskGauge } from './DiskGauge';
import { NzbsGauge } from './NzbsGauge';
import { TorrentsGauge } from './TorrentsGauge';
import './gauges.scss';

export function Gauges(props) {
  const { ws, jc } = useNats();
  const [nzbs, setNzbs] = useState('0.0');
  const [torrents, setTorrents] = useState('0.0');
  const [diskFree, setDiskFree] = useState('0.0');

  const handleTorrents = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as TorrentsResponse;
      // console.log('handleTorrents:', data);
      setTorrents((data.DownloadRate / 1000).toFixed(3));
    },
    [jc],
  );

  const handleNzbs = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as NzbResponse;
      // console.log('handleNzbs:', data);
      setNzbs((data.Status.DownloadRate / 1000).toFixed(3));
      setDiskFree((data.Status.FreeDiskSpaceMB / 1000).toFixed(3));
    },
    [jc],
  );

  useEffect(() => {
    let sub1: Subscription | null = null;
    let sub2: Subscription | null = null;

    ws.then(nc => {
      sub1 = nc.subscribe('flame.qbittorrents', { callback: handleTorrents });
      sub2 = nc.subscribe('flame.nzbs', { callback: handleNzbs });
    });

    return () => {
      sub1?.unsubscribe();
      sub2?.unsubscribe();
    };
  }, [ws, handleNzbs, handleTorrents]);

  return (
    <div className="gauges">
      <TorrentsGauge down={torrents} />
      <NzbsGauge down={nzbs} />
      <DiskGauge free={diskFree} />
    </div>
  );
}
