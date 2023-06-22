import { useQueryClient } from '@tanstack/react-query';
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
import { useDownloadsQuery } from '../../query/downloads';
import { useUpcomingQuery } from '../../query/media';

export default function UpcomingPage() {
  const queryClient = useQueryClient();
  const downloads = useDownloadsQuery();
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
