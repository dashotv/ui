import { useState } from 'react';
import * as React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ButtonMap, Chrono } from 'components/Common';
import { Episode } from 'components/Media/types';

export function Episodes({
  episodes,
  changeEpisode,
}: {
  episodes: Episode[];
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  return (
    <Paper elevation={0}>
      {episodes && episodes.map(row => <EpisodeRow key={row.id} episode={row} changeEpisode={changeEpisode} />)}
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
      icon: <CloudCircleIcon color="primary" fontSize="small" />,
      click: () => {},
      title: 'create download',
    },
    {
      icon: <NextPlanIcon color={skipped ? 'secondary' : 'action'} fontSize="small" />,
      click: () => {
        changeEpisode(id, 'skipped', !skipped);
        setSkipped(!skipped);
      },
      title: 'refresh',
    },
    {
      icon: <DownloadForOfflineIcon color={downloaded ? 'secondary' : 'action'} fontSize="small" />,
      click: () => {
        changeEpisode(id, 'downloaded', !downloaded);
        setDownloaded(!downloaded);
      },
      title: 'broken',
    },
    {
      icon: <CheckCircleIcon color={completed ? 'secondary' : 'action'} fontSize="small" />,
      click: () => {
        changeEpisode(id, 'completed', !completed);
        setCompleted(!completed);
      },
      title: 'favorite',
    },
    {
      icon: <VisibilityIcon color={watched ? 'secondary' : 'action'} fontSize="small" />,
      click: () => {
        console.log("can't change watched yet");
      },
      title: 'active',
    },
  ];

  return (
    <Paper elevation={1} sx={{ width: '100%', mb: 1 }}>
      <Stack sx={{ width: '100%' }} direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
        <Stack sx={{ width: '100%', pr: 1, pl: 1 }} direction="row" spacing={0} alignItems="center">
          <Typography
            display={{ xs: 'none', md: 'inherit' }}
            noWrap
            variant="subtitle1"
            color="textSecondary"
            minWidth="28px"
          >
            {number}
          </Typography>
          <Typography noWrap variant="h6" color="primary">
            {title}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ width: '100%', pr: 1, pl: 1, justifyContent: { md: 'end', xs: 'space-between' } }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              display={{ xs: 'inherit', md: 'none' }}
              noWrap
              variant="subtitle1"
              color="textSecondary"
              minWidth="28px"
            >
              {number}
            </Typography>
            <Typography color="gray" variant="button" noWrap>
              <Chrono format="YYYY-MM-DD">{release?.toString()}</Chrono>
            </Typography>
          </Stack>
          <ButtonMap buttons={buttons} size="large" />
        </Stack>
      </Stack>
    </Paper>
  );
}
