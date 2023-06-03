import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNats } from '../../components/Nats/usenats';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import LoadingIndicator from '../../components/Loading';
import Downloads from '../../components/Downloads';
import Media from '../../components/Media';
import { Subscription } from 'nats.ws';
import { TorrentsResponse } from '../../../types/torrents';
import { NzbResponse } from '../../../types/Nzb';

export function UpcomingPage() {
  const [upcoming, setUpcoming] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { ws, jc } = useNats();

  const handleTorrents = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as TorrentsResponse;
      // console.log('torrents:', data);
      // if (!data.Torrents) {
      //   return;
      // }
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
    },
    [jc],
  );

  const handleEpisodes = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }
      const data = jc.decode(msg.data);
      console.log('episodes:', data);
    },
    [jc],
  );

  const handleDownloads = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }
      const data = jc.decode(msg.data);
      console.log('downloads:', data);
    },
    [jc],
  );

  useEffect(() => {
    let sub1: Subscription | null = null;
    let sub2: Subscription | null = null;
    let sub3: Subscription | null = null;
    let sub4: Subscription | null = null;

    ws.then(nc => {
      sub1 = nc.subscribe('flame.qbittorrents', { callback: handleTorrents });
      sub2 = nc.subscribe('flame.nzbs', { callback: handleNzbs });
      sub3 = nc.subscribe('seer.episodes', { callback: handleEpisodes });
      sub4 = nc.subscribe('seer.downloads', { callback: handleDownloads });
    });

    return () => {
      sub1?.unsubscribe();
      sub2?.unsubscribe();
    };
  }, [ws, handleNzbs, handleTorrents]);

  useEffect(() => {
    const getUpcoming = () => {
      setLoading(true);
      axios
        .get('/api/tower/upcoming/')
        .then(response => {
          console.log(response.data);
          setUpcoming(response.data);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };

    const getDownloads = () => {
      axios
        .get('/api/tower/downloads/')
        .then(response => {
          console.log(response.data);
          setDownloads(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };

    getUpcoming();
    getDownloads();
  }, [enqueueSnackbar]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container maxWidth="xl">
        {loading && <LoadingIndicator />}
        <Downloads data={downloads} />
        <Media data={upcoming} type="series" />
      </Container>
    </>
  );
}
