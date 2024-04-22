import React from 'react';

import { Upcoming } from 'client/tower';
import { clickHandler } from 'utils/handler';

import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton } from '@dashotv/components';

import { MediaCard } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { useSeriesSettingMutation } from 'components/Series';

export const UpcomingCard = ({
  id,
  upcoming: {
    title,
    display,
    description,
    source_id,
    release_date,
    series_id,
    series_background,
    series_cover,
    series_kind,
    series_source,
    series_active,
    series_favorite,
    series_unwatched,
  },
}: {
  id: string;
  upcoming: Upcoming;
}) => {
  const series = useSeriesSettingMutation(series_id || 'unknown');
  const download = useDownloadCreateMutation();

  const seriesActive = () => {
    series.mutate({ name: 'active', value: !series_active });
  };
  const downloadCreate = () => {
    download.mutate(id);
  };

  const buttons: ButtonMapButton[] = [
    {
      Icon: StarsIcon,
      color: series_active ? 'secondary' : 'disabled',
      click: clickHandler(() => seriesActive()),
      title: 'Active',
    },
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: clickHandler(() => downloadCreate()),
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
      image={series_background || series_cover || '/blank.png'}
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
