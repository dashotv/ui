import React from 'react';

import { Upcoming } from 'client/tower';

import { MediaCard } from 'components/Common';

export const UpcomingCard = ({
  upcoming: {
    id,
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
  upcoming: Upcoming;
}) => {
  if (!id) {
    throw new Error('UpcomingCard requires an id');
  }
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
      count={series_unwatched}
      actions={false}
    />
  );
};
