import React from 'react';

import { Path } from 'components/Media';
import { Details, Paths, RoutingTabs, RoutingTabsRoute } from 'components/Tabs';

import { MovieType } from './types';

export type MovieTabsProps = {
  id: string;
  paths: Path[];
  movie: MovieType;
};
export const MovieTabs = ({ id, paths, movie }: MovieTabsProps) => {
  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Paths',
      to: '',
      element: <Paths paths={paths} />,
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
      to: 'watches',
      element: <div>watches</div>,
    },
  ];
  return <RoutingTabs data={tabsMap} route={`/movies/${id}`} />;
};
