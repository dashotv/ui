import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { useQueryClient } from '@tanstack/react-query';

import { LoadingIndicator } from 'components/Common';
import { DownloadList, DownloadType, useDownloadsActiveQuery } from 'components/Downloads';
import { JobsList, JobsStats } from 'components/Jobs';
import { Container } from 'components/Layout';
import { Log, LogsList, useLogsQuery } from 'components/Logs';
import { Episode, Media } from 'components/Media';
import { useSub } from 'hooks/sub';
import { useUpcomingQuery } from 'query/upcoming';
import { EventDownload, EventEpisode, EventLog } from 'types/events';

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
        if (data.episode.downloaded) {
          queryClient.setQueryData(['downloads', 'active'], (prev: DownloadType[]) =>
            prev.filter(e => e.id !== data.episode.id),
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

  const page = 1;
  const handleCancel = (_id: string) => {};

  const logs = useLogsQuery(page, 5);
  useSub('tower.logs', (data: EventLog) => {
    queryClient.setQueryData(['logs', page], (prev: Log[]) => {
      return [data.log, ...prev];
    });
  });

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Link to="/admin">
              <Typography variant="h6" color="primary">
                Jobs
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} justifyContent="end">
            <JobsStats />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <JobsList {...{ page, handleCancel }} limit={5} />
      </Container>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Link to="/admin/logs">
              <Typography variant="h6" color="primary">
                Logs
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} justifyContent="end"></Grid>
        </Grid>
      </Container>
      <Container>
        {logs.isFetching && <LoadingIndicator />}
        {logs.data && <LogsList logs={logs.data} />}
      </Container>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="primary">
              Upcoming
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} justifyContent="end"></Grid>
        </Grid>
      </Container>
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
