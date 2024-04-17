import React from 'react';
import { Link } from 'react-router-dom';

import { Medium, Movie } from 'client/tower';

import { Grid } from '@mui/material';

import { MediaCard } from 'components/Common';

export function MovieList({ data }: { type: string; data: Medium[] }) {
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
              <Link to={`/movies/${id}`}>
                <MovieCard movie={medium} />
              </Link>
            </Grid>
          );
        })}
    </>
  );
}

export const MovieCard = ({
  movie: {
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
  movie: Movie;
}) => {
  if (!id) {
    throw new Error('Media type and id is required');
  }
  return (
    <MediaCard
      id={id}
      type="movie"
      title={title || 'unknown'}
      subtitle={display}
      description={description}
      image={background || cover || '/blank.png'}
      kind={kind || 'movies'}
      source={source}
      source_id={source_id}
      release_date={release_date}
      icons={{ downloaded, completed }}
      actions={false}
    />
  );
};
