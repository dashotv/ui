import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Theme, useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ButtonMap, ButtonMapButton, Chrono, Megabytes, Resolution } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
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
  episode: { id, title, watched, episode_number: number, release_date: release, paths, ...episode },
  changeEpisode,
}: {
  episode: Episode;
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  if (!number) {
    return <></>;
  }
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const [skipped, setSkipped] = useState(episode.skipped);
  const [completed, setCompleted] = useState(episode.completed);
  const [downloaded, setDownloaded] = useState(episode.downloaded);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const buttons: ButtonMapButton[] = [
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: () => {
        download.mutate(id, {
          onSuccess: data => {
            if (data.error) {
              console.error('error: ', data.error);
              return;
            }
            navigate(`/downloads/${data.id}`);
          },
        });
      },
      title: 'create download',
    },
    {
      Icon: NextPlanIcon,
      color: skipped ? 'secondary' : 'action',
      click: () => {
        changeEpisode(id, 'skipped', !skipped);
        setSkipped(!skipped);
      },
      title: 'refresh',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'action',
      click: () => {
        changeEpisode(id, 'downloaded', !downloaded);
        setDownloaded(!downloaded);
      },
      title: 'broken',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'action',
      click: () => {
        changeEpisode(id, 'completed', !completed);
        setCompleted(!completed);
      },
      title: 'favorite',
    },
    {
      Icon: VisibilityIcon,
      color: watched ? 'secondary' : 'action',
      click: () => {
        console.log("can't change watched yet");
      },
      title: 'active',
    },
  ];

  const video = paths && paths.filter(path => path.type === 'video')[0];

  const Res = () => {
    if (!video) {
      return null;
    }
    return <Resolution resolution={video.resolution} />;
  };

  const Size = () => {
    if (!video || !video.size) {
      return null;
    }
    return <Megabytes value={video.size} ord="bytes" />;
  };

  return (
    <Paper elevation={1} sx={{ width: '100%', mb: 1, pr: 1, pl: 1 }}>
      <Stack width="100%" minWidth="0" direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
        <Stack width="100%" minWidth="0" direction="row" spacing={1} alignItems="center">
          <Typography noWrap variant="subtitle1" color="textSecondary" minWidth="34px">
            {number}
          </Typography>
          <Typography noWrap variant="h6" color="primary">
            {title}
          </Typography>
          {matches && <Res />}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          minWidth="0"
          width={{ xs: '100%', md: 'auto' }}
          alignItems="center"
          justifyContent="end"
        >
          {!matches && <Res />}
          <Size />
          <Typography color="gray" variant="button" minWidth="85px" textAlign="right" noWrap>
            <Chrono format="YYYY-MM-DD">{release?.toString()}</Chrono>
          </Typography>
          <ButtonMap buttons={buttons} size="small" />
        </Stack>
      </Stack>
    </Paper>
  );
}
