import React from 'react';

import { Movie as MovieType } from 'client/tower';

import { MovieBanner } from './Banner';
import { MovieTabs } from './Tabs';

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
