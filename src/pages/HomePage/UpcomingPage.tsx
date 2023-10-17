import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { DownloadList } from 'components/Downloads';
import LoadingIndicator from 'components/Loading';
import Media from 'components/Media';
import { useSubscription } from 'components/Nats/useSubscription';
import { useDownloadsActiveQuery } from 'query/downloads';
import { useUpcomingQuery } from 'query/upcoming';

export default function UpcomingPage() {
  const queryClient = useQueryClient();
  const downloads = useDownloadsActiveQuery();
  const upcoming = useUpcomingQuery();

  useSubscription(
    'seer.downloads',
    useCallback(
      data => {
        queryClient.invalidateQueries(['downloads', 'active']);
      },
      [queryClient],
    ),
  );

  useSubscription(
    'seer.episodes',
    useCallback(
      data => {
        queryClient.invalidateQueries(['media', 'upcoming']);
      },
      [queryClient],
    ),
  );

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {(downloads.isFetching || upcoming.isFetching) && <LoadingIndicator />}
        <Grid container spacing={1}>
          {downloads.data && <DownloadList downloads={downloads.data} />}
          {upcoming.data && <Media data={upcoming.data} type="series" />}
        </Grid>
      </Container>
    </>
  );
}
