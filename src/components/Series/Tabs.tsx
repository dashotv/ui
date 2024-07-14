import React from 'react';

import { Series } from 'client/tower';

import { RoutingTabs, RoutingTabsRoute } from '@dashotv/components';

import { Details, Downloads, Episodes, Paths, Watches } from 'components/Tabs';

export const SeriesTabs = ({ id, series }: { id: string; series: Series }) => {
  const { kind, seasons, currentSeason, paths } = series;
  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Episodes',
      to: '',
      element: (
        <>
          {kind && currentSeason && seasons ? (
            <Episodes kind={kind} series_id={id} season={currentSeason} seasons={seasons} />
          ) : null}
        </>
      ),
    },
    {
      label: 'Paths',
      to: `paths`,
      element: <Paths paths={paths} medium_id={id} />,
    },
    {
      label: 'Details',
      to: `details`,
      element: <>{series && <Details medium={series} />}</>,
    },
    {
      label: 'Downloads',
      to: `downloads`,
      element: <Downloads medium_id={id} />,
    },
    {
      label: 'Watches',
      to: `watches`,
      element: <Watches medium_id={id} />,
    },
  ];

  return <RoutingTabs data={tabsMap} mount="/series/:id" />;
};
