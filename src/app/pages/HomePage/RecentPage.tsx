import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import Downloads from '../../components/Downloads';

const pagesize = 42;

export function RecentPage() {
  const [recent, setRecent] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const getRecent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/tower/downloads/recent?page=${page}`,
        );
        console.log(response.data);
        setCount(response.data.count);
        setRecent(response.data.results);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getRecent();
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Home - Recent</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Pagination
          count={Math.ceil(count / pagesize)}
          onChange={handleChange}
        />
      </div>
      <Container maxWidth="xl">
        {loading && (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        )}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <Downloads data={recent} />
      </Container>
    </>
  );
}
