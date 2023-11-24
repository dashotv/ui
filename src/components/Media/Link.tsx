import React from 'react';
import { useNavigate } from 'react-router-dom';

import Link from '@mui/material/Link';

import { Medium } from 'types/medium';

export const MediaLink = ({ title, medium: { id, series_id, type } }: { title: string; medium: Medium }) => {
  return (
    <Link href="#" onClick={() => MediaGo(id, type, series_id)}>
      {title}
    </Link>
  );
};

export const MediaGo = (id: string, type: string, series_id?: string) => {
  const navigate = useNavigate();
  switch (type) {
    case 'Episode':
      if (!series_id) {
        navigate('/404');
        return;
      }
      navigate(`/series/${series_id}`);
      break;
    case 'Series':
      navigate(`/series/${id}`);
      break;
    case 'Movie':
      navigate(`/movies/${id}`);
      break;
  }
};
