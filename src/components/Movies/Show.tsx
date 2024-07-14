import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { Container, LoadingIndicator } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { MovieTabs, useMovieQuery } from 'components/Movies';
import { useSub } from 'hooks/sub';
import { EventMovie } from 'types/events';

import { MovieBanner } from './Banner';

export const MoviesShow = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Series id is required');
  }
  const { isFetching, data: movie } = useMovieQuery(id);
  const queryClient = useQueryClient();

  useSub('tower.movies', (data: EventMovie) => {
    if (data.id !== id) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['movies', id] });
  });

  return (
    <>
      <Helmet>
        <title>Movie{movie ? ` - ${movie?.result.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {isFetching && <LoadingIndicator />}
        {movie?.result && (
          <div className="medium large">
            <MovieBanner {...{ id, movie: movie?.result }} />
            <MovieTabs id={id} movie={movie.result} />
          </div>
        )}
      </Container>
    </>
  );
};
