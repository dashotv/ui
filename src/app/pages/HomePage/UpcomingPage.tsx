import axios from 'axios';
import { Subscription } from 'nats.ws';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { Notice } from '../../../types/Notice';
import { Nzb, NzbResponse, NzbResponseStatus } from '../../../types/Nzb';
import { Download, DownloadEvent } from '../../../types/download';
import { Medium, MediumEvent } from '../../../types/medium';
import { Torrent, TorrentsResponse } from '../../../types/torrents';
import Downloads from '../../components/Downloads';
import { Gauges } from '../../components/Guages';
import LoadingIndicator from '../../components/Loading';
import Media from '../../components/Media';
import { useNats } from '../../components/Nats/usenats';

export default function UpcomingPage() {
  const [upcoming, setUpcoming] = useState<Medium[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [torrents, setTorrents] = useState<Map<string, Torrent> | null>(null);
  const [nzbs, setNzbs] = useState<Map<number, Nzb> | null>(null);
  const [nzbStatus, setNzbStatus] = useState<NzbResponseStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { ws, jc } = useNats();

  const getDownloads = useCallback(() => {
    axios
      .get('/api/tower/downloads/')
      .then(response => {
        // console.log(response.data);
        setDownloads(response.data);
      })
      .catch(err => {
        enqueueSnackbar('error getting data', { variant: 'error' });
        console.error(err);
      });
  }, [enqueueSnackbar]);

  const handleTorrents = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as TorrentsResponse;
      // console.log('torrents:', data);
      const index = new Map<string, Torrent>();
      if (data.Torrents.length > 0) {
        for (const t of data.Torrents) {
          index.set(t.Hash, t);
        }
      }
      setTorrents(index);
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
      // console.log('nzbs:', data);
      const index = new Map<number, Nzb>();
      if (data.Result.length > 0) {
        for (const t of data.Result) {
          index.set(t.nzbid, t);
        }
      }
      setNzbs(index);
      setNzbStatus(data.Status);
    },
    [jc],
  );

  const handleEpisodes = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as MediumEvent;
      if (data.episode.downloaded === true) {
        // if an episode is marked as downloaded (a download was created)
        // remove from the upcoming list
        setUpcoming(prevState => {
          return prevState.filter(item => {
            return item.id !== data.id;
          });
        });
      }
    },
    [jc],
  );

  const handleDownloads = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as DownloadEvent;

      if (data.event === 'created') {
        // if a download is created, just get the downloads again
        getDownloads();
        return;
      }

      if (data.event === 'destroyed' || data.download.status === 'done') {
        // if a download was destroyed or completed, remove from list
        setDownloads(prevState => prevState.filter(item => item.id !== data.id));
        return;
      }

      // otherwise, update the download that was changed
      setDownloads(prevState => {
        return prevState.map(item => {
          if (item.id === data.id) {
            item.status = data.download.status;
            item.thash = data.download.thash;
            item.url = data.download.url;
            item.releaseId = data.download.releaseId;
          }
          return item;
        });
      });
    },
    [jc, getDownloads],
  );

  const handleNotices = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as Notice;
      console.log('notice', data);
      enqueueSnackbar(data.message, { variant: data.level });
    },
    [jc, enqueueSnackbar],
  );

  useEffect(() => {
    let sub1: Subscription | null = null;
    let sub2: Subscription | null = null;
    let sub3: Subscription | null = null;
    let sub4: Subscription | null = null;
    let sub5: Subscription | null = null;

    ws.then(nc => {
      sub1 = nc.subscribe('flame.qbittorrents', { callback: handleTorrents });
      sub2 = nc.subscribe('flame.nzbs', { callback: handleNzbs });
      sub3 = nc.subscribe('seer.episodes', { callback: handleEpisodes });
      sub4 = nc.subscribe('seer.downloads', { callback: handleDownloads });
      sub5 = nc.subscribe('seer.notices', { callback: handleNotices });
    });

    return () => {
      sub1?.unsubscribe();
      sub2?.unsubscribe();
      sub3?.unsubscribe();
      sub4?.unsubscribe();
      sub5?.unsubscribe();
    };
  }, [ws, handleNzbs, handleTorrents, handleNotices, handleDownloads, handleEpisodes]);

  useEffect(() => {
    const getUpcoming = () => {
      setLoading(true);
      axios
        .get('/api/tower/upcoming/')
        .then(response => {
          // console.log(response.data);
          setUpcoming(response.data);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };

    getUpcoming();
    getDownloads();
  }, [enqueueSnackbar, getDownloads]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {loading && <LoadingIndicator />}
        <Gauges />
        <Downloads data={downloads} torrents={torrents} nzbs={nzbs} nzbStatus={nzbStatus} />
        <Media data={upcoming} type="series" />
      </Container>
    </>
  );
}
