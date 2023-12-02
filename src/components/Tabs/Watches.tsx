import * as React from 'react';

import { tower } from 'utils/axios';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import { Chrono, LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { Watch } from 'components/Media/types';

const getWatches = async (medium_id: string) => {
  const response = await tower.get(`/watches/?medium_id=${medium_id}`);
  return response.data as Watch[];
};

const useWatchesQuery = (medium_id: string) =>
  useQuery({
    queryKey: ['watches', medium_id],
    queryFn: () => getWatches(medium_id),
    placeholderData: previousData => previousData,
    retry: false,
  });

export function Watches({ medium_id }: { medium_id: string }) {
  const { isFetching, data } = useWatchesQuery(medium_id);
  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <Paper elevation={0}>{data?.map(watch => <WatchRow key={watch.id} {...watch} />)}</Paper>
    </WrapErrorBoundary>
  );
}

function WatchRow({ id, username, watched_at, medium, player }: Watch) {
  const { display } = medium || {};
  return (
    <Paper key={id} elevation={1} sx={{ width: '100%', mb: 1 }}>
      <Stack
        sx={{ width: '100%', pr: 1, pl: 1, justifyContent: 'space-between' }}
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
      >
        <Typography noWrap width="100%" variant="h6" color="primary">
          {display}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', justifyContent: 'end' }}>
          <Typography noWrap variant="subtitle1" color="primary.dark">
            {username}
          </Typography>
          <Typography noWrap variant="button" color="secondary.dark">
            {player}
          </Typography>
          <Typography color="gray" variant="button" noWrap>
            <Chrono format="YYYY-MM-DD">{watched_at.toString()}</Chrono>
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
