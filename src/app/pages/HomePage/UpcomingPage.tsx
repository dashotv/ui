import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { Download } from '../../../types/download';
import { Medium } from '../../../types/medium';
import { DownloadList } from '../../components/Downloads';
import LoadingIndicator from '../../components/Loading';
import Media from '../../components/Media';
import { useSubscription } from '../../components/Nats/useSubscription';

export default function UpcomingPage() {
  const [upcoming, setUpcoming] = useState<Medium[]>([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [downloads, setDownloads] = useState<Download[]>([]);

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
              item.release_id = data.download.release_id;
            }
            return item;
          });
        });
      },
      [getDownloads, setDownloads],
    ),
  );

  useEffect(() => {
    getDownloads();
  }, [getDownloads]);

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
  }, [enqueueSnackbar]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {loading && <LoadingIndicator />}
        <DownloadList downloads={downloads} />
        <Media data={upcoming} type="series" />
      </Container>
    </>
  );
}
