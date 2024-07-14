import React from 'react';

import { Movie, Path } from 'client/tower';

import { RoutingTabs, RoutingTabsRoute } from '@dashotv/components';

import { Details, Downloads, Paths, Watches } from 'components/Tabs';

export type MovieTabsProps = {
  id: string;
  paths?: Path[];
  movie: Movie;
};
export const MovieTabs = ({ id, paths, movie }: MovieTabsProps) => {
  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Paths',
      to: '',
      element: <Paths paths={paths} medium_id={id} />,
    },
    {
      label: 'Details',
      to: 'details',
      element: movie ? <Details medium={movie} /> : <div>details</div>,
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
  return <RoutingTabs data={tabsMap} mount="/movies/:id" />;
};
