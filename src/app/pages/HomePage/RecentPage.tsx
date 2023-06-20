import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import { DownloadList } from '../../components/Downloads';
import LoadingIndicator from '../../components/Loading';

const pagesize = 42;

export default function RecentPage() {
  const [recent, setRecent] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const getRecent = () => {
      setLoading(true);
      axios
        .get(`/api/tower/downloads/recent?page=${page}`)
        .then(response => {
          console.log(response.data);
          setCount(response.data.count);
          setRecent(response.data.results);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getRecent();
  }, [page, enqueueSnackbar]);

  return (
    <>
      <Helmet>
        <title>Home - Recent</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        <div>
          <Pagination count={Math.ceil(count / pagesize)} onChange={handleChange} />
        </div>
        {loading && <LoadingIndicator />}
        <DownloadList downloads={recent} />
      </Container>
    </>
  );
}
