import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import LoadingIndicator from '../../components/Loading';
import Media from '../../components/Media';
import Typography from '@mui/material/Typography';

const pagesize = 42;

export function SeriesIndex() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axios
        .get(`/api/tower/series/?page=${page}`)
        .then(response => {
          console.log(response.data);
          setData(response.data.results);
          setCount(response.data.count);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getData();
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Series</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">Series</Typography>
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
        {loading && <LoadingIndicator />}
        {error && (
          <div>{`There is a problem fetching the data - ${error}`}</div>
        )}
        {data && <Media data={data} type="series" />}
      </Container>
    </>
  );
}
