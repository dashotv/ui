import moment from 'moment';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useCountdown } from 'usehooks-ts';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FeedIcon from '@mui/icons-material/Feed';
import OpacityIcon from '@mui/icons-material/Opacity';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

import { useSubscription } from 'components/Nats/useSubscription';

import './gauges.scss';

function BaseGauge({ icon, title, value, data, color }) {
  return <Chip icon={icon} label={value} color={color} size="small" />;
}

function Countdown({ eventTime, interval, last }) {
  const [intervalValue] = useState<number>(interval);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: eventTime,
    intervalMs: intervalValue,
  });

  useEffect(() => {
    startCountdown();
  });

  useEffect(() => {
    resetCountdown();
  }, [last]);

  return <div>{count}</div>;
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

function CountdownGauge(props) {
  const [last, setLast] = useState('');

  useSubscription(
    'seer.notices',
    useCallback(data => {
      console.log(data);
      if (data.message === 'processing downloads') {
        setLast(data.time);
      }
    }, []),
  );

  return (
    <BaseGauge
      title="Countdown"
      icon={<WatchLaterIcon />}
      value={<Countdown eventTime={300} interval={1000} last={last} />}
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
  const [nzbs, setNzbs] = useState('0.0');
  const [torrents, setTorrents] = useState('0.0');
  const [diskFree, setDiskFree] = useState('0.0');

  useSubscription(
    'flame.qbittorrents',
    useCallback(
      data => {
        const download = (data.DownloadRate / 1000).toFixed(3);
        setTorrents(download);
      },
      [setTorrents],
    ),
  );

  useSubscription(
    'flame.nzbs',
    useCallback(
      data => {
        const download = (data.Status.DownloadRate / 1000).toFixed(3);
        setNzbs(download);

        const free = (data.Status.FreeDiskSpaceMB / 1000).toFixed(3);
        setDiskFree(free);
      },
      [setNzbs, setDiskFree],
    ),
  );

  return (
    <div className="gauges">
      <Stack spacing={2} direction="row">
        <CountdownGauge color="primary" />
        <DiskGauge value={diskFree} color="primary" />
        <NzbsGauge value={nzbs} color="primary" />
        <TorrentsGauge value={torrents} color="primary" />
      </Stack>
    </div>
  );
}
