import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import Downloads from '../../components/Downloads';
import Media from '../../components/Media';
import * as React from 'react';

export function UpcomingPage() {
  const [upcoming, setUpcoming] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUpcoming = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/tower/upcoming/');
        console.log(response.data);
        setUpcoming(response.data);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getDownloads = async () => {
      try {
        const response = await axios.get('/api/tower/downloads/');
        console.log(response.data);
        setDownloads(response.data);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      }
    };

    getUpcoming();
    getDownloads();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
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
        <Downloads data={downloads} />
        <Media data={upcoming} type="series" />
      </Container>
    </>
  );
}
