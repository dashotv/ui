import React from 'react';
import { Link } from 'react-router-dom';

import { Medium } from 'client/tower';

import { Grid } from '@mui/material';

import { SeriesCard } from './Card';

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
