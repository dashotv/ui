import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import MediumMovie from '../../components/MediumLarge/MediumMovie';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import { Medium } from '../../../types/medium';
import { Path } from '../../../types/path';

export function MoviesShow() {
  const [data, setData] = useState<Medium | null>(null);
  const [paths, setPaths] = useState<Path[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  // @ts-ignore
  let { id } = useParams();

  const changeSetting = async (type, id, setting, value) => {
    console.log(`changeSetting: ${type}/${id} ${setting}=${value}`);

    try {
      const response = await axios.put(`/api/tower/${type}/${id}`, {
        setting: setting,
        value: value,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function changeMovieSetting(id, setting, value) {
    changeSetting('movies', id, setting, value);
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/tower/movies/${id}`);
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        // @ts-ignore
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const getPaths = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/tower/movies/${id}/paths`);
        console.log(response.data);
        setPaths(response.data);
      } catch (err) {
        // @ts-ignore
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
    getPaths();
  }, [id]);

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
        {data && (
          <MediumMovie
            id={data.id}
            type="movies"
            data={data}
            paths={paths}
            change={changeMovieSetting}
          />
        )}
      </Container>
    </>
  );
}
