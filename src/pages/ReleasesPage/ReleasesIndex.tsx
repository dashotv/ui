import React from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import LoadingIndicator from 'components/Loading';
import { usePopularQuery } from 'query/releases';

import './releases.scss';

function PopularList({ data, type }) {
  return (
    <div className="popular">
      <div className="header">{type}</div>
      {data?.map((row, index) => (
        <div key={index} className="entry">
          <span className="title">{row.name}</span>
          <span className="number">{row.count}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReleasesIndex() {
  const { isFetching, data } = usePopularQuery('daily');

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>

      <Container style={{ overflow: 'hidden' }} maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        <Grid container>
          <Grid item xs={4}>
            {data && data.tv && <PopularList type="tv" data={data.tv} />}
          </Grid>
          <Grid item xs={4}>
            {data && data.anime && <PopularList type="anime" data={data.anime} />}
          </Grid>
          <Grid item xs={4}>
            {data && data.movies && <PopularList type="movies" data={data.movies} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
