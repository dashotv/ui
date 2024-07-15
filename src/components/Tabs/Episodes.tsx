import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Episode } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Paper, Stack, Theme, Typography, useMediaQuery } from '@mui/material';

import { ButtonMap, ButtonMapButton, Chrono, LoadingIndicator, Megabytes, Resolution, Row } from '@dashotv/components';

import { useDownloadCreateMutation } from 'components/Downloads';
import {
  useEpisodeBatchSettingMutation,
  useEpisodeSettingMutation,
  useSeriesSeasonEpisodesQuery,
} from 'components/Series';
import { useWatchesCreateMutation, useWatchesDeleteMediumMutation } from 'components/Watches';
import { myPlexUsername } from 'types/constants';

import { Seasons } from './Seasons';

export function Episodes({
  series_id,
  season,
  seasons,
  kind,
}: {
  series_id: string;
  season: number;
  seasons: number[];
  kind: string;
}) {
  const [currentSeason, setCurrentSeason] = useState(season);
  const { isFetching, data } = useSeriesSeasonEpisodesQuery(series_id, currentSeason.toString());
  const [ids, setIds] = useState<string[]>([]);
  const [skipped, setSkipped] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [watched, setWatched] = useState(false);

  const episodeSetting = useEpisodeSettingMutation();
  const settings = useEpisodeBatchSettingMutation();

  function changeSeason(season) {
    setCurrentSeason(season);
  }

  function changeEpisode(id, key, value) {
    episodeSetting.mutate({ id: id, setting: { name: key, value: value } });
  }

  const updateSettings = (field: string, value: boolean) => {
    settings.mutate({ ids, field, value });
  };

  useEffect(() => {
    if (!data?.result) {
      return;
    }
    setIds(() => data?.result.map(episode => episode.id || '').filter(id => id));
    setSkipped(() => data?.result.filter(episode => episode.skipped).length === data?.result.length);
    setDownloaded(() => data?.result.filter(episode => episode.downloaded).length === data?.result.length);
    setCompleted(() => data?.result.filter(episode => episode.completed).length === data?.result.length);
    setWatched(() => data?.result.filter(episode => episode.watched).length === data?.result.length);
  }, [data?.result]);

  const buttons: ButtonMapButton[] = [
    {
      Icon: NextPlanIcon,
      color: skipped ? 'secondary' : 'disabled',
      click: () => updateSettings('skipped', !skipped),
      title: 'skipped',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'disabled',
      click: () => updateSettings('downloaded', !downloaded),
      title: 'downloaded',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'disabled',
      click: () => updateSettings('completed', !completed),
      title: 'completed',
    },
    {
      Icon: VisibilityIcon,
      color: watched ? 'secondary' : 'disabled',
      click: () => updateSettings('watched', !watched),
      title: 'watched',
    },
  ];

  return (
    <Paper elevation={0}>
      {isFetching && <LoadingIndicator />}
      {seasons ? <Seasons current={currentSeason} seasons={seasons} changeSeason={changeSeason} /> : null}
      {data?.result ? (
        <EpisodesList episodes={data?.result} kind={kind} buttons={buttons} changeEpisode={changeEpisode} />
      ) : null}
    </Paper>
  );
}

const EpisodesList = ({
  episodes,
  kind,
  changeEpisode,
  buttons,
}: {
  episodes: Episode[];
  kind: string;
  changeEpisode: (id: string, field: string, value: boolean) => void;
  buttons: ButtonMapButton[];
}) => {
  const map = new Map<number, Episode[]>();
  episodes.forEach(episode => {
    const key = episode.season_number || 0;
    const list = map.get(key) || [];
    list.push(episode);
    map.set(key, list);
  });

  return (
    <>
      <Row>
        <ButtonMap buttons={buttons} size="small" />
      </Row>
      {[...map.entries()].map(([season, episodes]) => (
        <React.Fragment key={season}>
          <Row key={season}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography variant="subtitle2" color="gray">
                Season {season}
              </Typography>
            </Stack>
          </Row>
          {episodes.map(episode => (
            <EpisodeRow key={episode.id} kind={kind} episode={episode} changeEpisode={changeEpisode} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

const SeasonEpisodeAbsolute = ({
  season,
  episode,
  absolute,
}: {
  kind: string;
  season?: number;
  episode?: number;
  absolute?: number;
}) => {
  const padded = (value: number = 0, places: number = 2) => `${value}`.padStart(places, '0');
  return `${padded(season, 2)}x${padded(episode, 2)}${absolute ? ` #${padded(absolute, 3)}` : ''}`;
};

function EpisodeRow({
  episode: {
    id,
    title,
    missing,
    season_number: season,
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
  const [watched, setWatched] = useState(episode.watched);
  const [watched_any, setWatchedAny] = useState(episode.watched_any);
  const [skipped, setSkipped] = useState(episode.skipped);
  const [completed, setCompleted] = useState(episode.completed);
  const [downloaded, setDownloaded] = useState(episode.downloaded);
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
      watchDelete.mutate(medium_id, {
        onSuccess: () => {
          setWatched(false);
          setWatchedAny(false);
        },
      });
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
            setWatched(true);
          } else {
            setWatchedAny(true);
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
        setSkipped(!skipped);
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
        setDownloaded(!downloaded);
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
        setCompleted(!completed);
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

  const Title = () => {
    if (!title) {
      return 'episode';
    }
    return title;
  };

  return (
    <Row key={id}>
      <Stack width="100%" minWidth="0" direction={{ xs: 'column', md: 'row' }} spacing={0} alignItems="center">
        <Stack width="100%" minWidth="0" direction="row" spacing={1} alignItems="baseline">
          <Typography
            noWrap
            title={`${number} #${absolute}`}
            variant="caption"
            color={missing ? 'error' : 'gray'}
            minWidth="70px"
          >
            <SeasonEpisodeAbsolute {...{ kind, season, episode: number, absolute }} />
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
