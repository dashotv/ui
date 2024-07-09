import React from 'react';

import { Movie } from 'client/tower';
import { clickHandler } from 'utils/handler';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { ButtonMapButton } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { MediaCard } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';

import { postMovieJob, useMovieSettingMutation } from './query';

export const MovieCard = ({
  id,
  movie: {
    title,
    display,
    description,
    kind,
    source,
    source_id,
    release_date,
    cover,
    background,
    broken,
    downloaded,
    completed,
  },
}: {
  id: string;
  movie: Movie;
}) => {
  const queryClient = useQueryClient();
  const movie = useMovieSettingMutation(id);
  const download = useDownloadCreateMutation();

  const movieFlag = (name: string, value: boolean) => {
    movie.mutate(
      { name, value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['movies'] });
        },
      },
    );
  };
  const movieJob = (name: string) => {
    postMovieJob(id, name);
  };
  const downloadCreate = () => {
    download.mutate({ medium_id: id });
  };
  const buttons: ButtonMapButton[] = [
    {
      Icon: BuildCircleIcon,
      color: broken ? 'secondary' : 'disabled',
      click: clickHandler(() => movieFlag('broken', !broken)),
      title: 'Broken',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'disabled',
      click: clickHandler(() => movieFlag('downloaded', !downloaded)),
      title: 'Broken',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'disabled',
      click: clickHandler(() => movieFlag('completed', !completed)),
      title: 'Broken',
    },
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: clickHandler(() => downloadCreate()),
      title: 'Download',
    },
    {
      Icon: ReplayCircleFilledIcon,
      color: 'primary',
      click: clickHandler(() => movieJob('refresh')),
      title: 'Update',
    },
  ];
  return (
    <MediaCard
      id={id}
      type="movie"
      title={title || 'unknown'}
      subtitle={display}
      description={description}
      image={background || cover || '/blank.png'}
      kind={kind || 'movies'}
      source={source}
      source_id={source_id}
      release_date={release_date}
      icons={{ downloaded, completed }}
      buttons={buttons}
    />
  );
};
