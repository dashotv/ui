import React from 'react';

import Link from '@mui/material/Link';

import { Medium } from './types';

export const MediaLink = ({ title, medium: { id, series_id, type } }: { title: string; medium: Medium }) => {
  return (
    <Link href="#" onClick={() => MediaTo(id, type, series_id)}>
      {title}
    </Link>
  );
};

export const MediaTo = (id: string, type: string, series_id?: string) => {
  switch (type) {
    case 'Episode':
      if (!series_id) {
        return '/404';
      }
      return `/series/${series_id}`;
    case 'Series':
      return `/series/${id}`;
    case 'Movie':
      return `/movies/${id}`;
  }
  return '/404';
};
