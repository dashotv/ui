import React from 'react';

import { Series } from 'client/tower';

import { RoutingTabs, RoutingTabsRoute } from '@dashotv/components';

import { FilesTab } from 'components/Files';
import { Details, Downloads, Paths, Watches } from 'components/Tabs';

import { Episodes } from './Episodes';

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
      label: 'Files',
      to: `files`,
      element: <FilesTab medium_id={id} />,
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
