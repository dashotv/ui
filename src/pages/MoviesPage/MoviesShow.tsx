import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { Movie, putMovieRefresh, useMovieQuery, useMovieSettingMutation } from 'components/Movies';
import { useSub } from 'hooks/useSub';
import { EventMovie } from 'types/events';

export default function MoviesShow() {
  const { id } = useParams();
  const { isFetching, data } = useMovieQuery(id);
  const queryClient = useQueryClient();
  const movieSetting = useMovieSettingMutation(id);

  function changeMovieSetting(id, setting, value) {
    movieSetting.mutate({ setting: setting, value: value });
  }

  const refresh = () => {
    if (!id) {
      return;
    }
    putMovieRefresh(id);
  };

  useSub('tower.movies', (data: EventMovie) => {
    if (data.id !== id) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['movies', id] });
  });

  return (
    <>
      <Helmet>
        <title>Movie{data ? ` - ${data.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {isFetching && <LoadingIndicator />}
        {data && <Movie id={data.id} movie={data} change={changeMovieSetting} refresh={refresh} />}
      </Container>
    </>
  );
}
