import React from 'react';
import { Link } from 'react-router-dom';

import { Medium, Series } from 'client/tower';

import { Grid } from '@mui/material';

import { MediaCard } from 'components/Common';

export function SeriesList({ data }: { type: string; data: Medium[] }) {
  return (
    <>
      {data &&
        data.map((medium: Medium) => {
          const { id, type: medium_type } = medium;
          if (!medium_type || !id) {
            throw new Error('Media type and id is required');
          }
          return (
            <Grid item key={id} md={4} xs={12}>
              <Link to={`/series/${id}`}>
                <SeriesCard series={medium} />
              </Link>
            </Grid>
          );
        })}
    </>
  );
}

export const SeriesCard = ({
  series: {
    id,
    title,
    display,
    description,
    kind,
    source,
    source_id,
    release_date,
    cover,
    background,
    downloaded,
    completed,
  },
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
      description={description}
      image={background || cover || '/blank.png'}
      kind={kind || 'tv'}
      source={source}
      source_id={source_id}
      release_date={release_date}
      icons={{ downloaded, completed }}
      actions={false}
    />
  );
};
