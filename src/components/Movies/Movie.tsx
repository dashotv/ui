import React from 'react';

import { MovieBanner } from './Banner';
import { MovieTabs } from './Tabs';
import { MovieType } from './types';

// TODO: watches

export type MovieProps = {
  id: string;
  movie: MovieType;
  change: (id: string, key: string, value) => void;
  refresh: () => void;
};
export function Movie({ id, movie, movie: { paths }, change, refresh }: MovieProps) {
  return (
    <div className="medium large">
      <MovieBanner {...{ id, movie, refresh, change }} />
      <MovieTabs {...{ id, paths, movie }} />
    </div>
  );
}
