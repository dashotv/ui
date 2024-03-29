import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import {
  Series,
  postSeriesJob,
  useEpisodeSettingMutation,
  useSeriesQuery,
  useSeriesSeasonEpisodesQuery,
  useSeriesSettingMutation,
} from 'components/Media';
import { useSub } from 'hooks/sub';
import { EventSeries } from 'types/events';

export default function SeriesShow() {
  const { id } = useParams();
  const { isFetching, data: series } = useSeriesQuery(id);
  const [currentSeason, setCurrentSeason] = useState(1);
  const { isFetching: episodesFetching, data: episodes } = useSeriesSeasonEpisodesQuery(id, currentSeason);
  const queryClient = useQueryClient();
  const seriesSetting = useSeriesSettingMutation(id);
  const episodeSetting = useEpisodeSettingMutation();
  const queue = (name: string) => {
    if (!id || !name) {
      return;
    }
    postSeriesJob(id, name);
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

  useSub('tower.series', (data: EventSeries) => {
    if (data.id !== id) {
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
      <Container>
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
            queue={queue}
          />
        )}
      </Container>
    </>
  );
}
