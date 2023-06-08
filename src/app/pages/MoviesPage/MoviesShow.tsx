import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Container from '@mui/material/Container';
import MediumMovie from '../../components/MediumLarge/MediumMovie';
import LoadingIndicator from '../../components/Loading';
import { Medium } from '../../../types/medium';
import { Path } from '../../../types/path';

export default function MoviesShow() {
  const [data, setData] = useState<Medium | null>(null);
  const [paths, setPaths] = useState<Path[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  // @ts-ignore
  let { id } = useParams();

  const changeSetting = (type, id, setting, value) => {
    console.log(`changeSetting: ${type}/${id} ${setting}=${value}`);

    axios
      .put(`/api/tower/${type}/${id}`, {
        setting: setting,
        value: value,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        enqueueSnackbar('error getting data', { variant: 'error' });
        console.error(err);
      });
  };

  function changeMovieSetting(id, setting, value) {
    changeSetting('movies', id, setting, value);
  }

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axios
        .get(`/api/tower/movies/${id}`)
        .then(response => {
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };

    const getPaths = () => {
      setLoading(true);
      axios
        .get(`/api/tower/movies/${id}/paths`)
        .then(response => {
          console.log(response.data);
          setPaths(response.data);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getData();
    getPaths();
  }, [id, enqueueSnackbar]);

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
        {loading && <LoadingIndicator />}
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
