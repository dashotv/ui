import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { Medium } from 'types/medium';

import { MediumBanner } from '.';

export function Media({ data }: { type: string; data: Medium[] }) {
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
  return (
    <>
      {data &&
        data.map((medium: Medium) => {
          const { type, id, series_id } = medium;
          return (
            <Grid item key={id} md={4} xs={12}>
              <Link to={path(type, id, series_id)}>
                <MediumBanner {...{ id, medium }} />
              </Link>
            </Grid>
          );
        })}
      ;
    </>
  );
}
