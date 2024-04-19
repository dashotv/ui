import React from 'react';

import { Series } from 'client/tower';

import { MediaCard } from 'components/Common';

export const SeriesCard = ({
  series: { id, title, display, kind, source, source_id, release_date, cover, background, active, favorite, broken },
}: {
  series: Series;
}) => {
  if (!id) {
    throw new Error('Media type and id is required');
  }
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
    />
  );
};
