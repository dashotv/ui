import * as React from 'react';
import { Link } from 'react-router-dom';

import { Medium } from 'client/tower';

import Grid from '@mui/material/Grid';

import { MediaCard } from 'components/Common';

const path = (type: string, id: string, series_id: string | undefined) => {
  switch (type) {
    case 'Series':
      return `/series/${id}`;
    case 'Episode':
      return `/series/${series_id}`;
    case 'Movie':
      return `/movies/${id}`;
    default:
      return `/${type}/404`;
  }
};

export function Media({ data, type }: { type: string; data: Medium[] }) {
  return (
    <>
      {data &&
        data.map((medium: Medium) => {
          const {
            id,
            type: medium_type,
            series_id,
            title,
            display,
            description,
            cover,
            kind,
            source,
            source_id,
            unwatched,
          } = medium;
          if (!medium_type || !id) {
            throw new Error('Media type and id is required');
          }
          return (
            <Grid item key={id} md={4} xs={12}>
              <Link to={path(medium_type, id, series_id)}>
                <MediaCard
                  id={id}
                  type={type}
                  title={title || 'unknown'}
                  subtitle={display}
                  description={description}
                  image={cover}
                  kind={kind || 'tv'}
                  source={source}
                  source_id={source_id}
                  count={unwatched}
                  actions={false}
                />
              </Link>
            </Grid>
          );
        })}
    </>
  );
}
