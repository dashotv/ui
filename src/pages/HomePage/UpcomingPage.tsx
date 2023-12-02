import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Grid from '@mui/material/Grid';

import { useQueryClient } from '@tanstack/react-query';

import { LoadingIndicator } from 'components/Common';
import { DownloadList, DownloadType, useDownloadsActiveQuery } from 'components/Downloads';
import { Container } from 'components/Layout';
import { Media } from 'components/Media';
import { Episode } from 'components/Media';
import { useSub } from 'hooks/sub';
import { useUpcomingQuery } from 'query/upcoming';
import { EventDownload, EventEpisode } from 'types/events';

export default function UpcomingPage() {
  const queryClient = useQueryClient();
  const downloads = useDownloadsActiveQuery();
  const upcoming = useUpcomingQuery();

  const updateDownloads = useCallback(
    (data: EventDownload) => {
      if (data.event === 'updated' && (data.download.status === 'done' || data.download.status === 'deleted')) {
        queryClient.setQueryData(['downloads', 'active'], (prev: DownloadType[]) => prev.filter(e => e.id !== data.id));
        return;
      }
      if (data.event === 'created' || data.event === 'new') {
        queryClient.setQueryData(['downloads', 'active'], (prev: DownloadType[]) => [...prev, data.download]);
        return;
      }
      if (data.event === 'updated') {
        queryClient.setQueryData(['downloads', 'active'], (prev: DownloadType[]) =>
          prev.map(e => (e.id === data.id ? data.download : e)),
        );
        return;
      }
    },
    [queryClient],
  );
  useSub('tower.downloads', updateDownloads);

  const updateUpcoming = useCallback(
    (data: EventEpisode) => {
      if (data.event === 'updated') {
        queryClient.setQueryData(['media', 'upcoming'], (prev: Episode[]) =>
          prev.map(e => (e.id === data.id ? data.episode : e)),
        );
      }
    },
    [queryClient],
  );
  useSub('tower.episodes', updateUpcoming);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {(downloads.isFetching || upcoming.isFetching) && <LoadingIndicator />}
        <Grid container spacing={1}>
          {downloads.data && <DownloadList downloads={downloads.data} />}
          {upcoming.data && <Media data={upcoming.data} type="series" />}
        </Grid>
      </Container>
    </>
  );
}
