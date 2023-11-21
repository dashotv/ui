import { useState } from 'react';
import * as React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Chip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { ButtonMap } from 'components/ButtonMap';
import Chrono from 'components/Chrono';
import { Episode } from 'types/medium';

export default function Episodes({
  episodes,
  changeEpisode,
}: {
  episodes: Episode[];
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  return (
    <Paper elevation={0}>
      {/* <table
        className="vertical-table"
        // size="small"
        aria-label="a dense table"
      >
        <thead>
          <tr>
            <td className="number">#</td>
            <td>Title</td>
            <td className="date" align="right">
              Release
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody> */}
      {episodes && episodes.map(row => <EpisodeRow key={row.id} episode={row} changeEpisode={changeEpisode} />)}
      {/* </tbody>
      </table> */}
    </Paper>
  );
}

function EpisodeRow({
  episode: { id, title, watched, episode_number: number, release_date: release, ...episode },
  changeEpisode,
}: {
  episode: Episode;
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  if (!number) {
    return <></>;
  }

  const [skipped, setSkipped] = useState(episode.skipped);
  const [completed, setCompleted] = useState(episode.completed);
  const [downloaded, setDownloaded] = useState(episode.downloaded);

  const buttons = [
    {
      icon: <CloudCircleIcon color="primary" />,
      click: () => {},
      title: 'create download',
    },
    {
      icon: <NextPlanIcon color={skipped ? 'secondary' : 'action'} />,
      click: () => {
        changeEpisode(id, 'skipped', !skipped);
        setSkipped(!skipped);
      },
      title: 'refresh',
    },
    {
      icon: <DownloadForOfflineIcon color={downloaded ? 'secondary' : 'action'} />,
      click: () => {
        changeEpisode(id, 'downloaded', !downloaded);
        setDownloaded(!downloaded);
      },
      title: 'broken',
    },
    {
      icon: <CheckCircleIcon color={completed ? 'secondary' : 'action'} />,
      click: () => {
        changeEpisode(id, 'completed', !completed);
        setCompleted(!completed);
      },
      title: 'favorite',
    },
    {
      icon: <VisibilityIcon color={watched ? 'secondary' : 'action'} />,
      click: () => {
        console.log("can't change watched yet");
      },
      title: 'active',
    },
  ];

  return (
    <Box key={number} sx={{ p: '3px', mb: '3px', width: '100%', overflow: 'hidden', backgroundColor: '#181818' }}>
      <Stack sx={{ width: '100%' }} direction="row" spacing={0}>
        <Box sx={{ pt: '8px', mr: 2, display: { sm: 'inherit', xs: 'none' } }}>
          <Avatar sx={{ height: '36px', width: '36px' }}>{number}</Avatar>
        </Box>
        <Stack sx={{ width: '100%' }} direction={{ xs: 'column', sm: 'row' }}>
          <Stack sx={{ width: '100%' }} direction="column">
            <Typography noWrap variant="h6" color="primary">
              {title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={0}>
                <Box sx={{ display: { sm: 'none', xs: 'inherit' }, mr: 1 }}>
                  <Chip label={String(number).padStart(2, '0')} size="small" />
                </Box>
                <Typography color="gray" variant="button" noWrap>
                  <Chrono format="YYYY-MM-DD">{release?.toString()}</Chrono>
                </Typography>
              </Stack>
              <ButtonMap buttons={buttons} size="large" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
