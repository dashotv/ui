import React, { useState } from 'react';

import { Paper } from '@mui/material';

import { LoadingIndicator } from '@dashotv/components';

import { EpisodesList } from 'components/Episodes';
import { useSeriesSeasonEpisodesQuery } from 'components/Series';

import { Seasons } from './Seasons';

export function Episodes({
  series_id,
  season,
  seasons,
  kind,
}: {
  series_id: string;
  season: number;
  seasons: number[];
  kind: string;
}) {
  const [currentSeason, setCurrentSeason] = useState(season);
  const { isFetching, data } = useSeriesSeasonEpisodesQuery(series_id, currentSeason.toString());

  function changeSeason(season) {
    setCurrentSeason(season);
  }

  return (
    <Paper elevation={0}>
      {isFetching && <LoadingIndicator />}
      {seasons ? <Seasons current={currentSeason} seasons={seasons} changeSeason={changeSeason} /> : null}
      {data?.result ? <EpisodesList episodes={data?.result} kind={kind} /> : null}
    </Paper>
  );
}
