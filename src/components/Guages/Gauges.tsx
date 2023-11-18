import { useCountdown } from 'usehooks-ts';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ChatIcon from '@mui/icons-material/Chat';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FeedIcon from '@mui/icons-material/Feed';
import OpacityIcon from '@mui/icons-material/Opacity';
import TrafficIcon from '@mui/icons-material/Traffic';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { useNats } from '@quara-dev/react-nats-context';

import { useSub } from 'hooks/useSub';
import { useDownloadsLastQuery } from 'query/downloads';
import { NzbResponse } from 'types/Nzb';
import { TorrentsResponse } from 'types/torrents';

import './gauges.scss';

type GaugeColor = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | undefined;
type GaugeProps = {
  title?: string;
  icon?: React.ReactElement;
  value?: React.ReactElement | string | number;
  color: GaugeColor;
};

function BaseGauge({ icon, value, color }: GaugeProps) {
  return <Chip icon={icon} label={value} color={color} size="small" />;
}

function Countdown({ eventTime, interval, last }: { eventTime: number; interval: number; last: string }) {
  const [intervalValue] = useState<number>(interval);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: eventTime,
    intervalMs: intervalValue,
  });

  const lastRef = useRef(last);

  useEffect(() => {
    startCountdown();
  });

  useEffect(() => {
    if (lastRef.current !== last) {
      lastRef.current = last;
      resetCountdown();
    }
  }, [last, resetCountdown]);

  return <div title={`${count}`}>{count > 0 ? count : 0}</div>;
}

function DiskGauge({ value, color }: GaugeProps) {
  return <BaseGauge icon={<DownloadForOfflineIcon />} value={value} color={color} />;
}

function CountdownGauge({ color }: GaugeProps) {
  const [last, setLast] = useState('');
  const [event, setEvent] = useState(300);
  const initial = useDownloadsLastQuery();

  useEffect(() => {
    if (initial.data) {
      const seconds = initial.data - Math.round(new Date().getTime() / 1000) + 300;
      setLast(seconds.toString());
      setEvent(seconds);
    }
  }, [initial.data]);

  useSub(
    'seer.notices',
    useCallback(({ message, time }: { message: string; time: string }) => {
      if (message === 'processing downloads') {
        setLast(time);
        setEvent(300);
      }
    }, []),
  );

  return (
    <BaseGauge
      title="Countdown"
      icon={<WatchLaterIcon />}
      value={<Countdown eventTime={event} interval={1000} last={last} />}
      color={initial.isFetching ? 'secondary' : color}
    />
  );
}

function NzbsGauge({ value, color }: GaugeProps) {
  return <BaseGauge title="NZBGet" icon={<FeedIcon />} value={value} color={color} />;
}

function TorrentsGauge({ value, color }: GaugeProps) {
  return <BaseGauge title="Torrent" icon={<OpacityIcon />} value={value} color={color} />;
}

function NatsGauge() {
  const { reconnecting, connecting, connected } = useNats();
  let color: GaugeColor = 'error';
  if (connected) {
    color = 'success';
  } else if (connecting || reconnecting) {
    color = 'warning';
  }
  return <TrafficIcon color={color} />;
}

function MessagesGauge() {
  const [color, setColor] = useState<GaugeColor>('primary');
  const location = useLocation();
  const cb = useCallback(() => {
    setColor('warning');
  }, []);
  if (location.pathname !== '/admin') {
    useSub('tower.logs', cb);
  }
  return <ChatIcon color={color} />;
}

export function Gauges() {
  const [nzbs, setNzbs] = useState('0.0');
  const [torrents, setTorrents] = useState('0.0');
  const [diskFree, setDiskFree] = useState('0.0');

  useSub(
    'flame.qbittorrents',
    useCallback((data: TorrentsResponse) => {
      const download = (data.DownloadRate / 1000).toFixed(1);
      setTorrents(download);
    }, []),
  );

  useSub(
    'flame.nzbs',
    useCallback((data: NzbResponse) => {
      const download = (data.Status.DownloadRate / 1000).toFixed(1);
      setNzbs(download);

      const free = (data.Status.FreeDiskSpaceMB / 1000).toFixed(1);
      setDiskFree(free);
    }, []),
  );

  return (
    <div className="gauges">
      <Stack spacing={2} direction="row">
        <CountdownGauge color="primary" />
        <DiskGauge value={diskFree} color={Number(diskFree) > 25.0 ? 'primary' : 'warning'} />
        <NzbsGauge value={nzbs} color="primary" />
        <TorrentsGauge value={torrents} color="primary" />
        <MessagesGauge />
        <NatsGauge />
      </Stack>
    </div>
  );
}
