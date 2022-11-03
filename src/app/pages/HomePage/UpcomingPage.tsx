import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import LoadingIndicator from '../../components/Loading';
import Downloads from '../../components/Downloads';
import Media from '../../components/Media';
import * as React from 'react';

export function UpcomingPage() {
  const [upcoming, setUpcoming] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUpcoming = () => {
      setLoading(true);
      axios
        .get('/api/tower/upcoming/')
        .then(response => {
          console.log(response.data);
          setUpcoming(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
        });
    };

    const getDownloads = () => {
      axios
        .get('/api/tower/downloads/')
        .then(response => {
          console.log(response.data);
          setDownloads(response.data);
        })
        .catch(err => {
          setError(err.message);
        });
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
        {loading && <LoadingIndicator />}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <Downloads data={downloads} />
        <Media data={upcoming} type="series" />
      </Container>
    </>
  );
}
