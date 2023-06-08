import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import MediumLarge from '../../components/MediumLarge';
import LoadingIndicator from '../../components/Loading';
import { Medium } from '../../../types/medium';

export default function SeriesShow() {
  const [data, setData] = useState<Medium | null>(null);
  const [paths, setPaths] = useState<Medium | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
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
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };

    const getPaths = () => {
      axios
        .get(`/api/tower/series/${id}/paths`)
        .then(response => {
          console.log('paths:', response.data);
          setPaths(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };

    const getSeasons = () => {
      axios
        .get(`/api/tower/series/${id}/seasons`)
        .then(response => {
          console.log('getSeasons:', response.data);
          setSeasons(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    const getCurrentSeason = () => {
      axios
        .get(`/api/tower/series/${id}/currentseason`)
        .then(response => {
          console.log('getCurrentSeason:', response.data);
          setCurrentSeason(response.data.current);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    const getWatches = () => {
      axios
        .get(`/api/tower/series/${id}/watches`)
        .then(response => {
          console.log('getWatches:', response.data);
          setWatches(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getData();
    getPaths();
    getSeasons();
    getCurrentSeason();
    getWatches();
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
    getSeason(currentSeason);
  }, [currentSeason, id]);

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
