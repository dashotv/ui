import React from 'react';
import { Link } from 'react-router-dom';

import { Upcoming } from 'client/tower';

import Grid from '@mui/material/Grid';

import { UpcomingCard } from './Card';

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

export const UpcomingList = ({ data }: { data: Upcoming[] }) => {
  return (
    <>
      {data?.map((upcoming: Upcoming) => {
        const { type, id, series_id } = upcoming;
        if (!type || !id) {
          throw new Error('Media type and id is required');
        }
        return (
          <Grid item key={id} md={4} xs={12}>
            <Link to={path(type, id, series_id)}>
              {/* <UpcomingBanner {...{ id, upcoming }} /> */}
              <UpcomingCard id={id} upcoming={upcoming} />
            </Link>
          </Grid>
        );
      })}
    </>
  );
};
