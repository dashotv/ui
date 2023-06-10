import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { Medium } from '../../../types/medium';
import LoadingIndicator from '../../components/Loading';
import MediumLarge from '../../components/MediumLarge';

export default function SeriesShow() {
  const [data, setData] = useState<Medium | null>(null);
  const [paths, setPaths] = useState<Medium | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(-1);
  const [episodes, setEpisodes] = useState([]);
  const [watches, setWatches] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // @ts-ignore
  let { id } = useParams();

  const changeSetting = (type, id, setting, value) => {
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

  function changeSeason(season) {
    console.log(`changeSeason: ${season}`);
    setCurrentSeason(season);
  }
  function changeEpisodeSetting(id, setting, value) {
    changeSetting('episodes', id, setting, value);
  }
  function changeSeriesSetting(id, setting, value) {
    changeSetting('series', id, setting, value);
  }

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axios
        .get(`/api/tower/series/${id}`)
        .then(response => {
          console.log('getData:', response.data);
          setData(response.data);
          setSeasons(response.data.seasons);
          setCurrentSeason(response.data.currentSeason);
          setPaths(response.data.paths);
          setWatches(response.data.watches);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getData();
  }, [id, enqueueSnackbar]);

  useEffect(() => {
    const getSeason = season => {
      axios
        .get(`/api/tower/series/${id}/seasons/${season}`)
        .then(response => {
          console.log('season:', currentSeason, ':', response.data);
          setEpisodes(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    };
    if (currentSeason >= 0) {
      getSeason(currentSeason);
    }
  }, [currentSeason, id]);

  return (
    <>
      <Helmet>
        <title>Series{data ? ` - ${data.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {loading && <LoadingIndicator />}
        {data && (
          <MediumLarge
            id={data.id}
            tupe="series"
            data={data}
            paths={paths}
            seasons={seasons}
            currentSeason={currentSeason}
            episodes={episodes}
            changeSeason={changeSeason}
            changeEpisode={changeEpisodeSetting}
            change={changeSeriesSetting}
            watches={watches}
          />
        )}
      </Container>
    </>
  );
}
