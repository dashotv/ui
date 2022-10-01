import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import { Medium } from '../../../types/medium';
import { Helmet } from 'react-helmet-async';

export function Series() {
  const [data, setData] = useState<Medium | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // @ts-ignore
  let { id } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(`/api/tower/series/${id}`);
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Series{data ? ` - ${data.title}` : ''}</title>
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
        {data && <div>{data.title}</div>}
      </Container>
    </>
  );
}
