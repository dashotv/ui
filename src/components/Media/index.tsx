import * as React from 'react';

import Grid from '@mui/material/Grid';

import MediumSmall from 'components/MediumSmall';
import MediumBanner from 'components/MediumSmall/MediumBanner';

export default function Media(props) {
  return (
    <>
      {props.data.map(
        ({
          id,
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
          </Grid>
        ),
      )}
    </>
  );
}
