import * as React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Media from '../../components/Media';
import { Link } from 'react-router-dom';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';

import { useEffect, useState } from 'react';

export function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/tower/upcoming/');
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
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
      <Container>
        {loading && (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        )}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        {data && <Media data={data} />}
      </Container>
    </>
  );
}
