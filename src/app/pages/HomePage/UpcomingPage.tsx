import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { connect, JSONCodec } from 'nats.ws';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import LoadingIndicator from '../../components/Loading';
import Downloads from '../../components/Downloads';
import Media from '../../components/Media';

interface TorrentsResponse {
  DownloadRate: bigint;
  UploadRate: bigint;
  Timestamp: Date;
  rid: bigint;
  Torrents: Torrent[];
}

interface Torrent {
  Hash: string;
  Progress: string;
  Queue: bigint;
  Name: string;
  Finish: bigint;
}

export function UpcomingPage() {
  const [upcoming, setUpcoming] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url] = useState('ws://10.0.4.61:9222/');
  const [jc] = useState(JSONCodec());
  const { enqueueSnackbar } = useSnackbar();

  // const handleTorrents = (err, msg) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //
  //   const data = jc.decode(msg.data) as TorrentsResponse;
  //   // console.log('torrents:', o);
  //   if (!data.Torrents) {
  //     return;
  //   }
  // };
  //
  // const handleNzbs = (err, msg) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //
  //   const o = jc.decode(msg.data);
  //   // console.log('nzbs:', o);
  // };
  //
  // useEffect(() => {
  //   connect({ servers: url })
  //     .then(nc => {
  //       console.log('nats: connected');
  //       nc.subscribe('flame.qbittorrents', { callback: handleTorrents });
  //       nc.subscribe('flame.nzbs', { callback: handleNzbs });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, [url]);

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
