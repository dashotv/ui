import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import {
  useEpisodeSettingMutation,
  useSeriesQuery,
  useSeriesSeasonEpisodesQuery,
  useSeriesSettingMutation,
} from '../../../query/series';
import LoadingIndicator from '../../components/Loading';
import MediumLarge from '../../components/MediumLarge';

export default function SeriesShow() {
  let { id } = useParams();
  const { isFetching, data: series } = useSeriesQuery(id);
  const [currentSeason, setCurrentSeason] = useState(null);
  const { isFetching: episodesFetching, data: episodes } = useSeriesSeasonEpisodesQuery(id, currentSeason);

  const seriesSetting = useSeriesSettingMutation(id);
  const episodeSetting = useEpisodeSettingMutation();

  function changeSeason(season) {
    console.log(`changeSeason: ${season}`);
    setCurrentSeason(season);
  }

  function changeEpisodeSetting(id, key, value) {
    episodeSetting.mutate({ id: id, setting: { setting: key, value: value } });
  }

  function changeSeriesSetting(id: string, key: string, value: any) {
    seriesSetting.mutate({ setting: key, value: value });
  }

  useEffect(() => {
    if (!series || !series.currentSeason) {
      return;
    }
    setCurrentSeason(series.currentSeason);
  }, [series, series?.currentSeason]);

  return (
    <>
      <Helmet>
        <title>Series{series ? ` - ${series.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {(isFetching || episodesFetching) && <LoadingIndicator />}
        {series && (
          <MediumLarge
            id={series.id}
            type="series"
            data={series}
            paths={series.paths}
            seasons={series.seasons}
            currentSeason={currentSeason}
            episodes={episodes}
            changeSeason={changeSeason}
            changeEpisode={changeEpisodeSetting}
            change={changeSeriesSetting}
            watches={series.watches}
          />
        )}
      </Container>
    </>
  );
}
