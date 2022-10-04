import * as React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Media from '../../components/Media';
import Downloads from '../../components/Downloads';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';

export function HomePage() {
  const [upcoming, setUpcoming] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUpcoming = async () => {
      try {
        const response = await axios.get('/api/tower/upcoming/');
        console.log(response.data);
        setUpcoming(response.data);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
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
        {/*{loading && (*/}
        {/*  <LoadingWrapper>*/}
        {/*    <LoadingIndicator />*/}
        {/*  </LoadingWrapper>*/}
        {/*)}*/}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        {downloads && <Downloads data={downloads} />}
        {upcoming && <Media data={upcoming} />}
      </Container>
    </>
  );
}
