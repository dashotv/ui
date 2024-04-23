import React from 'react';

import { Movie as MovieType, Path } from 'client/tower';

import { Details, Paths, RoutingTabs, RoutingTabsRoute, Watches } from 'components/Tabs';

export type MovieTabsProps = {
  id: string;
  paths?: Path[];
  movie: MovieType;
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
      element: <Details medium={movie} />,
    },
    {
      label: 'Downloads',
      to: 'downloads',
      element: <div>downloads</div>,
    },
    {
      label: 'Watches',
      to: `watches`,
      element: <Watches medium_id={id} />,
    },
  ];
  return <RoutingTabs data={tabsMap} route={`/movies/${id}`} />;
};
