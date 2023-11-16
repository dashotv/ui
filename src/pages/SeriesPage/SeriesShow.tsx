import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { useQueryClient } from '@tanstack/react-query';

import LoadingIndicator from 'components/Loading';
import { Series } from 'components/Media';
import { useSubscription } from 'components/Nats/useSubscription';
import {
  putSeriesRefresh,
  useEpisodeSettingMutation,
  useSeriesQuery,
  useSeriesSeasonEpisodesQuery,
  useSeriesSettingMutation,
} from 'query/series';

export default function SeriesShow() {
  const { id } = useParams();
  const { isFetching, data: series } = useSeriesQuery(id);
  const [currentSeason, setCurrentSeason] = useState(1);
  const { isFetching: episodesFetching, data: episodes } = useSeriesSeasonEpisodesQuery(id, currentSeason);
  const queryClient = useQueryClient();
  const seriesSetting = useSeriesSettingMutation(id);
  const episodeSetting = useEpisodeSettingMutation();
  const refresh = () => {
    if (!id) {
      return;
    }
    putSeriesRefresh(id);
  };

  function changeSeason(season) {
    setCurrentSeason(season);
  }

  function changeEpisodeSetting(id, key, value) {
    episodeSetting.mutate({ id: id, setting: { setting: key, value: value } });
  }

  function changeSeriesSetting(id: string, key: string, value) {
    seriesSetting.mutate({ setting: key, value: value });
  }

  useEffect(() => {
    if (!series || !series.currentSeason) {
      return;
    }
    setCurrentSeason(series.currentSeason);
  }, [series, series?.currentSeason]);

  useSubscription('tower.series', data => {
    if (data.ID !== id) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['series', id] });
  });

  return (
    <>
      <Helmet>
        <title>Series{series ? ` - ${series.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {(isFetching || episodesFetching) && <LoadingIndicator />}
        {series && (
          <Series
            id={series.id}
            series={series}
            currentSeason={currentSeason}
            episodes={episodes}
            changeSeason={changeSeason}
            changeEpisode={changeEpisodeSetting}
            change={changeSeriesSetting}
            refresh={refresh}
          />
        )}
      </Container>
    </>
  );
}
