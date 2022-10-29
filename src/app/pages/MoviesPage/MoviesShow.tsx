import React, { useEffect, useState } from 'react';
import { Medium } from '../../../types/medium';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import MediumMovie from '../../components/MediumLarge/MediumMovie';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';

export function MoviesShow() {
  const [data, setData] = useState<Medium | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [seasons, setSeasons] = useState([]);
  // const [currentSeason, setCurrentSeason] = useState(1);
  // const [episodes, setEpisodes] = useState([]);

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

  // function changeSeason(season) {
  //   console.log(`changeSeason: ${season}`);
  //   setCurrentSeason(season);
  // }
  // function changeEpisodeSetting(id, setting, value) {
  //   changeSetting('episodes', id, setting, value);
  // }
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

    // const getSeasons = async () => {
    //   console.log('getSeasons');
    //   try {
    //     const response = await axios.get(`/api/tower/series/${id}/seasons`);
    //     console.log(response.data);
    //     setSeasons(response.data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // const wait = async () => {
    //   setLoading(true);
    //   await Promise.all([getData()]);
    //   setLoading(false);
    // };
    getData();
  }, [id]);

  // useEffect(() => {
  //   const getSeason = async season => {
  //     try {
  //       const response = await axios.get(
  //         `/api/tower/series/${id}/seasons/${season}`,
  //       );
  //       console.log(response.data);
  //       setEpisodes(response.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getSeason(currentSeason);
  // }, [currentSeason, id]);

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
            change={changeMovieSetting}
          />
        )}
      </Container>
    </>
  );
}
