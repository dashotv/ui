import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import LoadingIndicator from '../../components/Loading';
import Media from '../../components/Media';

const pagesize = 42;

export default function SeriesIndex() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
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
  }, [page, enqueueSnackbar]);

  return (
    <>
      <Helmet>
        <title>Series</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">Series</Typography>
          </Grid>
          <Grid item xs={6}>
            <Pagination sx={{ float: 'right' }} count={Math.ceil(count / pagesize)} onChange={handleChange} />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" sx={{ overflow: 'auto' }}>
        {loading && <LoadingIndicator />}
        {data && <Media data={data} type="series" />}
      </Container>
    </>
  );
}
