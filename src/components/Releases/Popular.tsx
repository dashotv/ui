import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Popular } from 'client/tower';

import Link from '@mui/material/Link';

import { useQueryString } from 'hooks/queryString';

import './popular.scss';

export function PopularList({ data, type }: { data: Popular[]; type: string }) {
  const url =
    type !== 'anime' ? `http://themoviedb.org/search?query=` : 'https://myanimelist.net/anime.php?cat=anime&q=';

  return (
    <div className="popular">
      <div className="header">{type}</div>
      {data?.map(({ name, count, year = 0 }, index) => (
        <div key={index} className="entry">
          <span className="title">
            <Link href={`${url}${name}${year > 0 ? `+y:${year}` : ''}`} target="_window">
              {name}
              {year > 0 && ` (${year})`}
            </Link>
          </span>
          <span className="number">
            <RouterLink to={name ? SearchURL(name, type) : '#'}>{count}</RouterLink>
          </span>
        </div>
      ))}
    </div>
  );
}

export function SearchURL(text: string, type: string) {
  const { queryString } = useQueryString();
  const base = '/releases/search?';
  const settings = {
    text: text,
    type: type,
    resolution: type === 'movies' ? '1080' : '',
    exact: type === 'movies' ? false : true,
    verified: true,
  };

  return base + queryString(settings);
}
