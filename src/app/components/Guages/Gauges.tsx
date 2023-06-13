import { Subscription } from 'nats.ws';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import { Box, Card, CardContent, Paper, Stack, Typography } from '@mui/material';

import { NzbResponse } from '../../../types/Nzb';
import { TorrentsResponse } from '../../../types/torrents';
import { useNats } from '../Nats/usenats';
import './gauges.scss';

function BaseGauge(props) {
  return (
    <Box sx={{ minWidth: '32%' }}>
      <Card variant="outlined">
        <CardContent>
          <Stack direction="row">
            <Stack direction="column" sx={{ width: '50%' }}>
              <Typography variant="subtitle2">{props.title}</Typography>
              <Typography variant="h4">{props.value}</Typography>
            </Stack>
            <Stack direction="column" sx={{ width: '50%' }}>
              <Sparklines sx={{ mt: 2 }} data={props.data} limit={20} width={100} height={35}>
                <SparklinesLine color="white" />
              </Sparklines>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

function DiskGauge(props) {
  return <BaseGauge title="Disk" value={props.value} data={props.data} color={props.color} />;
}

function NzbsGauge(props) {
  return <BaseGauge title="NZB" value={props.value} data={props.data} color={props.color} />;
}

function TorrentsGauge(props) {
  return <BaseGauge title="Tor" value={props.value} data={props.data} color={props.color} />;
}

export function Gauges(props) {
  const { ws, jc } = useNats();
  const [nzbs, setNzbs] = useState('0.0');
  const [nzbsData, setNzbsData] = useState<Number[]>([]);
  const [torrents, setTorrents] = useState('0.0');
  const [torrentsData, setTorrentsData] = useState<Number[]>([]);
  const [diskFree, setDiskFree] = useState('0.0');
  const [diskData, setDiskData] = useState<Number[]>([]);

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
      setTorrentsData(current => {
        current.push(Number(download));
        return current.slice(-20);
      });
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
      setNzbsData(current => {
        current.push(Number(download));
        return current.slice(-20);
      });

      const free = (data.Status.FreeDiskSpaceMB / 1000).toFixed(3);
      setDiskFree(free);
      setDiskData(current => {
        current.push(Number(free));
        return current.slice(-20);
      });
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
        <DiskGauge value={diskFree} data={diskData} />
        <NzbsGauge value={nzbs} data={nzbsData} />
        <TorrentsGauge value={torrents} data={torrentsData} />
      </Stack>
    </div>
  );
}
