import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { LoadingIndicator } from '@dashotv/components';
import { Container } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

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
  if (!id) {
    return null;
  }
  const { isFetching, data: series } = useSeriesQuery(id);
  const [currentSeason, setCurrentSeason] = useState(1);
  const { isFetching: episodesFetching, data: episodes } = useSeriesSeasonEpisodesQuery(id, currentSeason.toString());
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
    episodeSetting.mutate({ id: id, setting: { name: key, value: value } });
  }

  function changeSeriesSetting(id: string, key: string, value) {
    seriesSetting.mutate({ name: key, value: value });
  }

  useEffect(() => {
    if (!series?.result?.currentSeason) {
      return;
    }
    setCurrentSeason(series.result.currentSeason);
  }, [series, series?.result?.currentSeason]);

  useSub('tower.series', (data: EventSeries) => {
    if (data.id !== id) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['series', id] });
  });

  return (
    <>
      <Helmet>
        <title>Series{series?.result ? ` - ${series?.result?.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {(isFetching || episodesFetching) && <LoadingIndicator />}
        {series?.result?.id && (
          <Series
            id={series.result.id}
            series={series.result}
            currentSeason={currentSeason}
            episodes={episodes?.result || []}
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
