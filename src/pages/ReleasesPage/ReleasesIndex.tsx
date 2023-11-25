import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { PopularList, usePopularQuery } from 'components/Releases';

export default function ReleasesIndex() {
  const { interval } = useParams();
  const { isFetching, data } = usePopularQuery(interval || 'daily');

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>

      <Container>
        {isFetching && <LoadingIndicator />}
        <Grid container>
          <Grid item md={4} xs={12}>
            {data && data.tv && <PopularList type="tv" data={data.tv} />}
          </Grid>
          <Grid item md={4} xs={12}>
            {data && data.anime && <PopularList type="anime" data={data.anime} />}
          </Grid>
          <Grid item md={4} xs={12}>
            {data && data.movies && <PopularList type="movies" data={data.movies} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
