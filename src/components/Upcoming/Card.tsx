import React from 'react';

import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import StarsIcon from '@mui/icons-material/Stars';
import { Upcoming } from 'client/tower';

import { ButtonMapButton } from '@dashotv/components';
import { MediaCard } from 'components/Common';

export const UpcomingCard = ({
  id,
  upcoming: {
    title,
    display,
    description,
    series_background,
    series_kind,
    series_source,
    source_id,
    release_date,
    series_active,
    series_favorite,
    series_unwatched,
  },
}: {
  id: string;
  upcoming: Upcoming;
}) => {
  const buttons: ButtonMapButton[] = [
    {
      Icon: StarsIcon,
      color: series_active ? 'secondary' : 'disabled',
      click: () => console.log('click', id),
      title: 'Active',
    },
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: () => console.log('click', id),
      title: 'Download',
    },
  ];
  return (
    <MediaCard
      id={id}
      type="upcoming"
      title={title || 'unknown'}
      subtitle={display}
      description={description}
      image={series_background}
      kind={series_kind}
      source={series_source}
      source_id={source_id}
      release_date={release_date}
      icons={{ active: series_active, favorite: series_favorite }}
      buttons={buttons}
      count={series_unwatched}
    />
  );
};
