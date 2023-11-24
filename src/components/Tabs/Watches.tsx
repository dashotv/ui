import * as React from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono } from 'components/Common';
import { Watch } from 'types/medium';

export function Watches({ data }: { data: Watch[] }) {
  return <Paper elevation={0}>{data?.map(watch => <WatchRow key={watch.id} {...watch} />)}</Paper>;
}

function WatchRow({ id, username, watched_at, medium }: Watch) {
  const { season_number, episode_number, title } = medium || {};
  return (
    <Paper key={id} elevation={1} sx={{ width: '100%', mb: 1 }}>
      <Stack
        sx={{ width: '100%', pr: 1, pl: 1, justifyContent: 'space-between' }}
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
      >
        <Typography noWrap width="100%" variant="h6" color="primary">
          {season_number}x{episode_number} {title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', justifyContent: 'end' }}>
          <Typography noWrap variant="subtitle1" color="textSecondary">
            {username}
          </Typography>
          <Typography color="gray" variant="button" noWrap>
            <Chrono format="YYYY-MM-DD">{watched_at.toString()}</Chrono>
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
  // return (
  //   <tr key={id}>
  //     <td className="date">
  //       <Chrono format="YYYY-MM-DD">{watched_at.toString()}</Chrono>
  //     </td>
  //     <td className="user">{username}</td>
  //     <td>
  //       {season_number}x{episode_number} {title}
  //     </td>
  //   </tr>
  // );
}
