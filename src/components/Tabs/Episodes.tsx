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

import { ButtonMap, ButtonMapButton, Chrono, Megabytes, Resolution, Row } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { Episode } from 'components/Media/types';

export function Episodes({
  kind,
  episodes,
  changeEpisode,
}: {
  kind: string;
  episodes: Episode[];
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  return (
    <Paper elevation={0}>
      {episodes &&
        episodes.map(row => <EpisodeRow key={row.id} kind={kind} episode={row} changeEpisode={changeEpisode} />)}
    </Paper>
  );
}

function EpisodeRow({
  episode: {
    id,
    title,
    watched,
    watched_any,
    episode_number: number,
    absolute_number: absolute,
    release_date: release,
    paths,
    ...episode
  },
  kind,
  changeEpisode,
}: {
  kind: string;
  episode: Episode;
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const [skipped, setSkipped] = useState(episode.skipped);
  const [completed, setCompleted] = useState(episode.completed);
  const [downloaded, setDownloaded] = useState(episode.downloaded);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const watchedColor = (watched, watched_any) => {
    if (watched) {
      return 'secondary';
    }
    if (watched_any) {
      return 'action';
    }
    return 'disabled';
  };

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
      color: skipped ? 'secondary' : 'disabled',
      click: () => {
        changeEpisode(id, 'skipped', !skipped);
        setSkipped(!skipped);
      },
      title: 'skipped',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'disabled',
      click: () => {
        changeEpisode(id, 'downloaded', !downloaded);
        setDownloaded(!downloaded);
      },
      title: 'downloaded',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'disabled',
      click: () => {
        changeEpisode(id, 'completed', !completed);
        setCompleted(!completed);
      },
      title: 'completed',
    },
    {
      Icon: VisibilityIcon,
      color: watchedColor(watched, watched_any),
      click: () => {
        console.log("can't change watched yet");
      },
      title: `watched ${watched}/${watched_any}`,
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

  const Number = () => {
    if (!number) {
      return null;
    }
    switch (kind) {
      case 'anime':
      case 'ecchi':
        return '#' + `${absolute}`.padStart(3, '0');
      default:
        return number;
    }
  };

  const Title = () => {
    if (!title) {
      return 'episode';
    }
    return title;
  };

  return (
    <Row>
      <Stack width="100%" minWidth="0" direction={{ xs: 'column', md: 'row' }} spacing={0} alignItems="center">
        <Stack width="100%" minWidth="0" direction="row" spacing={1} alignItems="center">
          <Typography noWrap title={`${number} #${absolute}`} variant="subtitle1" color="textSecondary" minWidth="34px">
            <Number />
          </Typography>
          <Typography noWrap color="primary" fontWeight="bolder">
            <Title />
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
    </Row>
  );
}
