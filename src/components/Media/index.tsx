import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import MediumBanner from 'components/MediumSmall/MediumBanner';

export default function Media({ type, data }) {
  const path = (type, id, series_id) => {
    switch (type) {
      case 'Series':
        return `/series/${id}`;
      case 'Episode':
        return `/series/${series_id}`;
      case 'Movie':
        return `/movies/${id}`;
      default:
        return `/404`;
    }
  };
  return (
    <>
      {data &&
        data.map(
          ({
            id,
            type,
            series_id,
            title,
            display,
            description,
            cover,
            background,
            release_date,
            active,
            unwatched,
            completed,
            favorite,
            broken,
          }) => (
            <Grid item key={id} md={4} xs={12}>
              <Link to={path(type, id, series_id)}>
                <MediumBanner
                  {...{
                    type,
                    id,
                    series_id,
                    cover,
                    background,
                    title,
                    display,
                    release_date,
                    description,
                    unwatched,
                    active,
                    completed,
                    favorite,
                    broken,
                  }}
                />
              </Link>
            </Grid>
          ),
        )}
    </>
  );
}
