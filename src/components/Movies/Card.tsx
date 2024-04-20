import React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { ButtonMapButton } from '@dashotv/components';

import { Movie } from 'client/tower';

import { MediaCard } from 'components/Common';

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
  const buttons: ButtonMapButton[] = [
        {
          Icon: BuildCircleIcon,
          color: broken ? 'secondary' : 'disabled',
          click: () => console.log('click', id),
          title: 'Broken',
        },
        {
          Icon: DownloadForOfflineIcon,
          color: downloaded ? 'secondary' : 'disabled',
          click: () => console.log('click', id),
          title: 'Broken',
        },
        {
          Icon: CheckCircleIcon,
          color: completed ? 'secondary' : 'disabled',
          click: () => console.log('click', id),
          title: 'Broken',
        },
        {
          Icon: CloudCircleIcon,
          color: 'primary',
          click: () => console.log('click', id),
          title: 'Download',
        },
        {
          Icon: ReplayCircleFilledIcon,
          color: 'primary',
          click: () => console.log('click', id),
          title: 'Update',
        },
        {
          Icon: RemoveCircleIcon,
          color: 'error',
          click: () => console.log('click', id),
          title: 'Delete',
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
