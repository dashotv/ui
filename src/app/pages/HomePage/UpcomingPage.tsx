import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { useDownloadsActiveQuery } from '../../../query/downloads';
import { useUpcomingQuery } from '../../../query/upcoming';
import { DownloadList } from '../../components/Downloads';
import LoadingIndicator from '../../components/Loading';
import Media from '../../components/Media';
import { useSubscription } from '../../components/Nats/useSubscription';

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
        {downloads.data && <DownloadList downloads={downloads.data} />}
        {upcoming.data && <Media data={upcoming.data} type="series" />}
      </Container>
    </>
  );
}
