import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useQueryClient } from '@tanstack/react-query';

import { DownloadList } from 'components/Downloads';
import LoadingIndicator from 'components/Loading';
import { Media } from 'components/Media';
import { useSub } from 'hooks/useSub';
import { useDownloadsActiveQuery } from 'query/downloads';
import { useUpcomingQuery } from 'query/upcoming';
import { Download } from 'types/download';

export default function UpcomingPage() {
  const queryClient = useQueryClient();
  const downloads = useDownloadsActiveQuery();
  const upcoming = useUpcomingQuery();

  const updateDownloads = useCallback(
    data => {
      if (data.Event === 'updated' && (data.Download.status === 'done' || data.Download.status === 'deleted')) {
        queryClient.setQueryData(['downloads', 'active'], (prev: Download[]) => prev.filter(e => e.id !== data.ID));
        return;
      }
      if (data.Event === 'created' || data.Event === 'new') {
        queryClient.setQueryData(['downloads', 'active'], (prev: Download[]) => [...prev, data.Download]);
        return;
      }
      if (data.Event === 'updated') {
        queryClient.setQueryData(['downloads', 'active'], (prev: Download[]) =>
          prev.map(e => (e.id === data.ID ? data.Download : e)),
        );
        return;
      }
    },
    [queryClient],
  );
  useSub('tower.downloads', updateDownloads);

  const updateUpcoming = useCallback(
    data => {
      if (!upcoming.data) {
        return;
      }

      console.log('updateUpcoming: ', data);
      const episode = upcoming.data.filter(e => e.id === data.id);
      if (episode.length > 0) {
        queryClient.setQueryData(
          ['media', 'upcoming'],
          upcoming.data.map(e => (e.id === data.id ? data : e)),
        );
      }
    },
    [queryClient],
  );
  useSub('seer.episodes', updateUpcoming);
  useSub('tower.episodes', updateUpcoming);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container sx={{ pt: '5px', pb: '5px' }} style={{ overflow: 'auto' }} maxWidth="xl">
        {(downloads.isFetching || upcoming.isFetching) && <LoadingIndicator />}
        <Grid container spacing={1}>
          {downloads.data && <DownloadList downloads={downloads.data} />}
          {upcoming.data && <Media data={upcoming.data} type="series" />}
        </Grid>
      </Container>
    </>
  );
}
