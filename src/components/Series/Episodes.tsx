import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Truncate from 'react-truncate-inside';

import { Episode, Overrides } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, Paper, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import {
  ButtonMap,
  ButtonMapButton,
  Chrono,
  LoadingIndicator,
  Megabytes,
  Resolution,
  Row,
  Text,
} from '@dashotv/components';

import { useDownloadCreateMutation } from 'components/Downloads';
import {
  useEpisodeBatchSettingMutation,
  useEpisodeMutation,
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
  const [selected, setSelected] = useState<Episode | null>(null);
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
            <Link key={episode.id} onClick={() => setSelected(episode)} sx={{ textDecoration: 'none' }}>
              <EpisodeRow key={episode.id} kind={kind} episode={episode} changeEpisode={changeEpisode} />
            </Link>
          ))}
        </React.Fragment>
      ))}
      {selected && (
        <EpisodeDialog
          open={selected !== null}
          handleClose={() => {
            setSelected(null);
          }}
          kind={kind}
          episode={selected}
        />
      )}
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
    has_overrides,
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
          <Typography noWrap color="primary" fontWeight="bolder">
            <Truncate text={title || 'episode'} />
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

export const EpisodeDialog = ({
  open,
  handleClose,
  kind,
  episode,
}: {
  episode: Episode;
  open: boolean;
  kind: string;
  handleClose: () => void;
}) => {
  const {
    id,
    title,
    created_at,
    updated_at,
    season_number: season,
    episode_number: number,
    absolute_number: absolute,
    release_date: release,
    missing,
    description,
    overrides,
  } = episode;
  if (!id) {
    return null;
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { control, handleSubmit } = useForm<Overrides>({ values: overrides });
  const update = useEpisodeMutation(id);
  const submit = (data: Overrides) => {
    episode.overrides = data;
    update.mutate(episode);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen} maxWidth="md">
      <DialogTitle>
        <Typography noWrap color="primary" fontWeight="bolder">
          Edit Episode
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
          <Stack width="100%" direction="column" spacing={1}>
            {/* <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
              Title
            </Typography> */}
            <Stack minWidth="0" direction="column" spacing={0} alignItems="baseline">
              <Typography noWrap color="primary" fontWeight="bolder">
                <Truncate text={title || 'episode'} />
              </Typography>
              <Typography
                noWrap
                title={`${number} #${absolute}`}
                variant="caption"
                color={missing ? 'error' : 'gray'}
                minWidth="70px"
              >
                <SeasonEpisodeAbsolute {...{ kind, season, episode: number, absolute }} />
              </Typography>
            </Stack>
            {/* <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
              Description
            </Typography> */}
            <Box sx={{ pt: 2, pb: 2, pr: 2 }}>
              {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
            </Box>
            <Stack width="100%" direction="column" spacing={1}>
              <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                Overrides
              </Typography>
              <Stack direction="row" spacing={1}>
                <Text name="season_number" label="season" control={control} />
                <Text name="episode_number" label="episode" control={control} />
                <Text name="absolute_number" label="absolute" control={control} />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  ID
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {id}
                </Typography>
              </Stack>
              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  Created
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {created_at}
                </Typography>
              </Stack>

              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  Updated
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {updated_at}
                </Typography>
              </Stack>

              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  Release
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {release ? new Date(release).toDateString() : null}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 3, width: '100%', justifyContent: 'end' }}>
              <Button variant="contained" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Ok
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
