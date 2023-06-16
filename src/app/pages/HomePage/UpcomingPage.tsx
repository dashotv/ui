import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { Nzb, NzbResponseStatus } from '../../../types/Nzb';
import { Download } from '../../../types/download';
import { Medium } from '../../../types/medium';
import { Torrent } from '../../../types/torrents';
import Downloads from '../../components/Downloads';
import LoadingIndicator from '../../components/Loading';
import Media from '../../components/Media';
import { useSubscription } from '../../components/Nats/useSubscription';

export default function UpcomingPage() {
  const [upcoming, setUpcoming] = useState<Medium[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [torrents, setTorrents] = useState<Map<string, Torrent> | null>(null);
  const [nzbs, setNzbs] = useState<Map<number, Nzb> | null>(null);
  const [nzbStatus, setNzbStatus] = useState<NzbResponseStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

  useSubscription(
    'flame.qbittorrents',
    useCallback(
      data => {
        const index = new Map<string, Torrent>();
        if (data.Torrents.length > 0) {
          for (const t of data.Torrents) {
            index.set(t.Hash, t);
          }
        }
        setTorrents(index);
      },
      [setTorrents],
    ),
  );

  useSubscription(
    'flame.nzbs',
    useCallback(
      data => {
        const index = new Map<number, Nzb>();
        if (data.Result.length > 0) {
          for (const t of data.Result) {
            index.set(t.nzbid, t);
          }
        }
        setNzbs(index);
        setNzbStatus(data.Status);
      },
      [setNzbs, setNzbStatus],
    ),
  );

  useSubscription(
    'seer.episodes',
    useCallback(
      data => {
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
      [setUpcoming],
    ),
  );

  useSubscription(
    'seer.downloads',
    useCallback(
      data => {
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
      [getDownloads, setDownloads],
    ),
  );

  useSubscription(
    'seer.notices',
    useCallback(
      data => {
        console.log('notice', data);
        enqueueSnackbar(data.message, { variant: data.level });
      },
      [enqueueSnackbar],
    ),
  );

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
        <Downloads data={downloads} torrents={torrents} nzbs={nzbs} nzbStatus={nzbStatus} />
        <Media data={upcoming} type="series" />
      </Container>
    </>
  );
}
