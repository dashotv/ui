import { Subscription } from 'nats.ws';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FeedIcon from '@mui/icons-material/Feed';
import OpacityIcon from '@mui/icons-material/Opacity';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

import { NzbResponse } from '../../../types/Nzb';
import { TorrentsResponse } from '../../../types/torrents';
import { useNats } from '../Nats/usenats';
import './gauges.scss';

function BaseGauge(props) {
  return <Chip icon={props.icon} label={`${props.title}: ${props.value}`} />;
}

function DiskGauge(props) {
  return (
    <BaseGauge
      title="Root"
      icon={<DownloadForOfflineIcon />}
      value={props.value}
      data={props.data}
      color={props.color}
    />
  );
}

function NzbsGauge(props) {
  return <BaseGauge title="NZBGet" icon={<FeedIcon />} value={props.value} data={props.data} color={props.color} />;
}

function TorrentsGauge(props) {
  return <BaseGauge title="Torrent" icon={<OpacityIcon />} value={props.value} data={props.data} color={props.color} />;
}

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
      const download = (data.DownloadRate / 1000).toFixed(3);
      setTorrents(download);
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
      const download = (data.Status.DownloadRate / 1000).toFixed(3);
      setNzbs(download);

      const free = (data.Status.FreeDiskSpaceMB / 1000).toFixed(3);
      setDiskFree(free);
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
      <Stack spacing={2} direction="row">
        <DiskGauge value={diskFree} />
        <NzbsGauge value={nzbs} />
        <TorrentsGauge value={torrents} />
      </Stack>
    </div>
  );
}
