import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import { Upcoming } from 'client/tower';

import Grid from '@mui/material/Grid';

import { Container, LoadingIndicator } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { DownloadList, useDownloadsActiveQuery } from 'components/Downloads';
import { UpcomingList, useUpcomingQuery } from 'components/Upcoming';
import { useSub } from 'hooks/sub';
import { EventDownloading, EventEpisode } from 'types/events';

export default function UpcomingPage() {
  const queryClient = useQueryClient();
  const downloads = useDownloadsActiveQuery();
  const upcoming = useUpcomingQuery();

  const updateDownloads = useCallback(
    (event: EventDownloading) => {
      queryClient.setQueryData(['downloads', 'active'], () => event.downloads);
    },
    [queryClient],
  );
  useSub('tower.downloading', updateDownloads);

  const updateUpcoming = useCallback(
    (data: EventEpisode) => {
      if (data.event === 'updated') {
        if (data.episode.downloaded) {
          queryClient.setQueryData(['media', 'upcoming'], (prev: Upcoming[]) => {
            return prev ? prev.filter(e => e.id !== data.episode.id) : [];
          });
        } else {
          queryClient.setQueryData(['media', 'upcoming'], (prev: Upcoming[]) => {
            if (prev.filter(e => e.id === data.id).length === 0) {
              return [...prev, data.episode];
            }
            return prev.map(e => (e.id === data.id ? data.episode : e));
          });
        }
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
          {upcoming.data && <UpcomingList data={upcoming.data} />}
        </Grid>
      </Container>
    </>
  );
}
