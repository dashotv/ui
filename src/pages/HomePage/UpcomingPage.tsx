import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Grid from '@mui/material/Grid';

import { LoadingIndicator } from '@dashotv/components';
import { Container } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { DownloadList, DownloadType, useDownloadsActiveQuery } from 'components/Downloads';
import { Media } from 'components/Media';
import { Episode } from 'components/Media';
import { UpcomingList } from 'components/Upcoming';
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
        queryClient.setQueryData(['downloads', 'active'], (prev: DownloadType[]) =>
          prev ? prev.filter(e => e.id !== data.id) : [],
        );
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
        if (data.episode.downloaded) {
          queryClient.setQueryData(['downloads', 'active'], (prev: DownloadType[]) =>
            prev ? prev.filter(e => e.id !== data.episode.id) : [],
          );
        } else {
          queryClient.setQueryData(['media', 'upcoming'], (prev: Episode[]) => {
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
          {upcoming.data && <UpcomingList data={upcoming.data.result} />}
        </Grid>
      </Container>
    </>
  );
}
