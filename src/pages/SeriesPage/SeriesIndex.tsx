import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { LoadingIndicator } from 'components/Common';
import { Media } from 'components/Media';
import { useSeriesAllQuery } from 'query/series';

const pagesize = 42;

export default function SeriesIndex() {
  const [page, setPage] = useState(1);
  const { isFetching, data } = useSeriesAllQuery(page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Series</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Series</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {data && (
              <Pagination
                sx={{ float: 'right' }}
                page={page}
                count={Math.ceil((data?.count || 0) / pagesize)}
                onChange={handleChange}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" sx={{ overflow: 'auto' }}>
        <Grid container spacing={1}>
          {isFetching && <LoadingIndicator />}
          {data && <Media data={data.results} type="series" />}
        </Grid>
      </Container>
    </>
  );
}
