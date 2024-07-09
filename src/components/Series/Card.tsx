import React from 'react';

import { Series } from 'client/tower';
import { clickHandler } from 'utils/handler';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { MediaCard } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';

import { postSeriesJob, useSeriesSettingMutation } from './query';

export const SeriesCard = ({
  id,
  series: {
    title,
    display,
    kind,
    source,
    source_id,
    release_date,
    cover,
    background,
    active,
    favorite,
    broken,
    unwatched,
  },
}: {
  id: string;
  series: Series;
}) => {
  const queryClient = useQueryClient();
  const series = useSeriesSettingMutation(id);
  const download = useDownloadCreateMutation();

  const seriesFlag = (name: string, value: boolean) => {
    series.mutate(
      { name, value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['series'] });
        },
      },
    );
  };
  const seriesJob = (name: string) => {
    postSeriesJob(id, name);
  };
  const downloadCreate = () => {
    download.mutate({ medium_id: id, multi: true });
  };

  const buttons: ButtonMapButton[] = [
    {
      Icon: BuildCircleIcon,
      color: broken ? 'secondary' : 'disabled',
      click: clickHandler(() => seriesFlag('broken', !broken)),
      title: 'Broken',
    },
    {
      Icon: RecommendIcon,
      color: favorite ? 'secondary' : 'disabled',
      click: clickHandler(() => seriesFlag('favorite', !favorite)),
      title: 'Favorite',
    },
    {
      Icon: StarsIcon,
      color: active ? 'secondary' : 'disabled',
      click: clickHandler(() => seriesFlag('active', !active)),
      title: 'Active',
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
      click: clickHandler(() => seriesJob('refresh')),
      title: 'Update',
    },
  ];

  return (
    <MediaCard
      id={id}
      type="series"
      title={title || 'unknown'}
      subtitle={display}
      // description={description}
      image={background || cover || '/blank.png'}
      kind={kind || 'tv'}
      source={source}
      source_id={source_id}
      release_date={release_date}
      count={unwatched}
      icons={{ active, favorite, broken }}
      buttons={buttons}
    />
  );
};
