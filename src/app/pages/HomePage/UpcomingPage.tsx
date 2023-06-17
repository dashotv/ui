import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { Medium } from '../../../types/medium';
import { DownloadList } from '../../components/Downloads';
import LoadingIndicator from '../../components/Loading';
import Media from '../../components/Media';
import { useSubscription } from '../../components/Nats/useSubscription';

export default function UpcomingPage() {
  const [upcoming, setUpcoming] = useState<Medium[]>([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
        <DownloadList />
        <Media data={upcoming} type="series" />
      </Container>
    </>
  );
}
