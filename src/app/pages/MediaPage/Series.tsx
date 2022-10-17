import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import { Medium } from '../../../types/medium';
import { MediumLarge } from '../../components/Medium';
import { Helmet } from 'react-helmet-async';

export function Series() {
  const [data, setData] = useState<Medium | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);

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

  const getSeasons = async () => {
    console.log('getSeasons');
    try {
      const response = await axios.get(`/api/tower/series/${id}/seasons`);
      console.log(response.data);
      setSeasons(response.data);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      setError(err.message);
      // } finally {
      //   setLoading(false);
    }
  };

  function changeSeason(season) {
    console.log(`changeSeason: ${season}`);
    setCurrentSeason(season);
  }

  function changeSetting(id, type, value) {
    console.log(`changeSetting: ${id} ${type} ${value}`);
  }

  const getSeason = async season => {
    try {
      const response = await axios.get(
        `/api/tower/series/${id}/seasons/${season}`,
      );
      console.log(response.data);
      setEpisodes(response.data);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      setError(err.message);
      // } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getSeasons();
  }, []);

  useEffect(() => {
    getSeason(currentSeason);
  }, [currentSeason]);

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
        {/*{loading && (*/}
        {/*  <LoadingWrapper>*/}
        {/*    <LoadingIndicator />*/}
        {/*  </LoadingWrapper>*/}
        {/*)}*/}
        {/*{error && (*/}
        {/*  <div>{`There is a problem fetching the post data - ${error}`}</div>*/}
        {/*)}*/}
        {data && (
          <MediumLarge
            id={data.id}
            data={data}
            seasons={seasons}
            episodes={episodes}
            currentSeason={currentSeason}
            changeSeason={changeSeason}
            changeSetting={changeSetting}
          />
        )}
      </Container>
    </>
  );
}
