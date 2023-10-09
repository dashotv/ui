import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import MediumSmall from 'components/MediumSmall';
import MediumBanner from 'components/MediumSmall/MediumBanner';

export default function Media(props) {
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
      {props.data.map(
        ({
          id,
          type,
          series_id,
          title,
          display,
          description,
          cover,
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
                type={props.type}
                id={series_id || id}
                background={cover}
                title={title}
                display={display}
                release_date={release_date}
                active={active}
                description={description}
                unwatched={unwatched}
                completed={completed}
                cover={cover}
                favorite={favorite}
                broken={broken}
                // change={change?}
              />
            </Link>
          </Grid>
        ),
      )}
    </>
  );
}
