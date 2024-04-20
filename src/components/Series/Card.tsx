import React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton } from '@dashotv/components';
import { Series } from 'client/tower';

import { MediaCard } from 'components/Common';

export const SeriesCard = ({
  id,
  series: { title, display, kind, source, source_id, release_date, cover, background, active, favorite, broken },
}: {
  id: string;
  series: Series;
}) => {
  const buttons: ButtonMapButton[] = [
        {
          Icon: BuildCircleIcon,
          color: broken ? 'secondary' : 'disabled',
          click: () => console.log('click', id),
          title: 'Broken',
        },
        {
          Icon: RecommendIcon,
          color: favorite ? 'secondary' : 'disabled',
          click: () => console.log('click', id),
          title: 'Favorite',
        },
        {
          Icon: StarsIcon,
          color: active ? 'secondary' : 'disabled',
          click: () => console.log('click', id),
          title: 'Active',
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
      type="series"
      title={title || 'unknown'}
      subtitle={display}
      // description={description}
      image={background || cover || '/blank.png'}
      kind={kind || 'tv'}
      source={source}
      source_id={source_id}
      release_date={release_date}
      icons={{ active, favorite, broken }}
      buttons={buttons}
    />
  );
};
