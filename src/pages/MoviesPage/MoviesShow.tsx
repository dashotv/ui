import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { useQueryClient } from '@tanstack/react-query';

import LoadingIndicator from 'components/Loading';
import Movie from 'components/Media/Movie';
import { useSub } from 'hooks/useSub';
import { putMovieRefresh, useMovieQuery, useMovieSettingMutation } from 'query/movies';

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

  useSub('tower.movies', data => {
    if (data.ID !== id) {
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
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <Movie id={data.id} movie={data} change={changeMovieSetting} refresh={refresh} />}
      </Container>
    </>
  );
}
