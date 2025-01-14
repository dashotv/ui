import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { LoadingIndicator } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { Container } from 'components/Common';
import { useSeriesQuery } from 'components/Series';
import { useSub } from 'hooks/sub';
import { EventSeries } from 'types/events';

import { SeriesBanner } from './Banner';
import { SeriesTabs } from './Tabs';

export const SeriesShow = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Series id is required');
  }
  const { isFetching, data: series } = useSeriesQuery(id);
  const queryClient = useQueryClient();

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
        {isFetching && <LoadingIndicator />}
        {series?.result && series?.result?.id && (
          <div className="medium large">
            <SeriesBanner id={series.result.id} series={series.result} />
            <SeriesTabs id={series.result.id} series={series.result} />
          </div>
        )}
      </Container>
    </>
  );
};
export default SeriesShow;
