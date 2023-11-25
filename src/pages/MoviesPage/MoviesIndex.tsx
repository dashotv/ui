import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { Media } from 'components/Media';
import { useMoviesAllQuery } from 'components/Movies';

const pagesize = 42;

export default function MoviesIndex() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const { isFetching, data } = useMoviesAllQuery(page);

  useEffect(() => {
    if (!data?.count) return;
    setCount(Math.ceil((data.count || 0) / pagesize)); // Math.ceil((data?.count || 0) / pagesize)
  }, [data?.count]);

  const handleChange = (event: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Movies</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6} sx={{ pt: 2 }}>
            {data && (
              <Pagination
                sx={{ display: 'flex', justifyContent: 'end' }}
                page={page}
                count={count}
                onChange={handleChange}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={1}>
          {isFetching && <LoadingIndicator />}
          {data && <Media data={data.results} type="movies" />}
        </Grid>
      </Container>
    </>
  );
}
