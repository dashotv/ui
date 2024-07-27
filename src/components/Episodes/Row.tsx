import React from 'react';
import { useNavigate } from 'react-router-dom';
import Truncate from 'react-truncate-inside';

import { Episode } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';

import { ButtonMap, ButtonMapButton, Chrono, Megabytes, Resolution, Row } from '@dashotv/components';

import { useDownloadCreateMutation } from 'components/Downloads';
import { useWatchesCreateMutation, useWatchesDeleteMediumMutation } from 'components/Watches';
import { myPlexUsername } from 'types/constants';

import { SeasonEpisodeAbsolute } from './Sea';

export const EpisodeRow = ({
  episode,
  kind,
  changeEpisode,
  selectEpisode,
}: {
  kind: string;
  episode: Episode;
  changeEpisode: (id: string, field: string, value: boolean) => void;
  selectEpisode: (episode: Episode | null) => void;
}) => {
  const {
    id,
    title,
    missing,
    season_number: season,
    episode_number: number,
    absolute_number: absolute,
    release_date: release,
    paths,
    has_overrides,
    watched,
    watched_any,
    skipped,
    completed,
    downloaded,
  } = episode;

  const download = useDownloadCreateMutation();
  const navigate = useNavigate();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const watch = useWatchesCreateMutation();
  const watchDelete = useWatchesDeleteMediumMutation();

  const watchClick = (medium_id?: string) => {
    let username = 'someone';
    if (!medium_id) {
      console.error('missing medium_id');
      return;
    }
    if (watched) {
      watchDelete.mutate(medium_id);
      return;
    }
    if (watched_any) {
      username = myPlexUsername;
    }
    watch.mutate(
      { medium_id, username },
      {
        onSuccess: () => {
          if (username === myPlexUsername) {
            // setWatched(true);
          } else {
            // setWatchedAny(true);
          }
        },
      },
    );
  };

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
        if (!id) {
          return;
        }
        download.mutate(
          { medium_id: id },
          {
            onSuccess: data => {
              navigate(`/downloads/${data.id}`);
            },
          },
        );
      },
      title: 'create download',
    },
    {
      Icon: NextPlanIcon,
      color: skipped ? 'secondary' : 'disabled',
      click: () => {
        if (!id) {
          return;
        }
        changeEpisode(id, 'skipped', !skipped);
        // setSkipped(!skipped);
      },
      title: 'skipped',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'disabled',
      click: () => {
        if (!id) {
          return;
        }
        changeEpisode(id, 'downloaded', !downloaded);
        // setDownloaded(!downloaded);
      },
      title: 'downloaded',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'disabled',
      click: () => {
        if (!id) {
          return;
        }
        changeEpisode(id, 'completed', !completed);
        // setCompleted(!completed);
      },
      title: 'completed',
    },
    {
      Icon: VisibilityIcon,
      color: watchedColor(watched, watched_any),
      click: () => watchClick(id),
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

  return (
    <Row key={id}>
      <Stack
        width="100%"
        minWidth="0"
        direction={{ xs: 'column', md: 'row' }}
        spacing={0}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack minWidth="0" direction="row" spacing={1} alignItems="baseline">
          <Typography
            noWrap
            title={`${number} #${absolute}`}
            variant="caption"
            color={missing ? 'error' : has_overrides ? 'secondary' : 'gray'}
            minWidth="70px"
          >
            <SeasonEpisodeAbsolute {...{ kind, season, episode: number, absolute }} />
          </Typography>
          <Link href="#" onClick={() => selectEpisode(episode)} sx={{ textDecoration: 'none' }}>
            <Typography component="div" noWrap color="primary" fontWeight="bolder">
              <Truncate text={title || 'episode'} />
            </Typography>
          </Link>
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
};
