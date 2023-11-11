import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import Movie from 'components/Media/Movie';
import { useMovieQuery, useMovieSettingMutation } from 'query/movies';

export default function MoviesShow() {
  let { id } = useParams();
  const { isFetching, data } = useMovieQuery(id);
  const movieSetting = useMovieSettingMutation(id);

  function changeMovieSetting(id, setting, value) {
    movieSetting.mutate({ setting: setting, value: value });
  }

  return (
    <>
      <Helmet>
        <title>Movie{data ? ` - ${data.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <Movie id={data.id} type="movies" data={data} paths={data.paths} change={changeMovieSetting} />}
      </Container>
    </>
  );
}
