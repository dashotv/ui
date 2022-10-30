import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import Media from '../../components/Media';

const pagesize = 42;

export function MoviesIndex() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/tower/movies/?page=${page}`);
        console.log(response.data);
        setData(response.data.results);
        setCount(response.data.count);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Movies</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">Movies</Typography>
          </Grid>
          <Grid item xs={6}>
            <Pagination
              count={Math.ceil(count / pagesize)}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" sx={{ overflow: 'auto' }}>
        {loading && (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        )}
        {error && (
          <div>{`There is a problem fetching the data - ${error}`}</div>
        )}
        {data && <Media data={data} type="movies" />}
      </Container>
    </>
  );
}