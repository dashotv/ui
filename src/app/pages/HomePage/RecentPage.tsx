import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import Downloads from '../../components/Downloads';

export function RecentPage() {
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRecent = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/tower/downloads/recent');
        console.log(response.data);
        setRecent(response.data);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getRecent();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Recent</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
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
