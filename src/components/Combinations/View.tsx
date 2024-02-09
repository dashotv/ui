import React from 'react';
import { useParams } from 'react-router-dom';

import { LoadingIndicator } from 'components/Common';
import { PlexPlaylist } from 'components/Plex';

import './View.scss';
import { useCombinationQuery } from './query';

export const CombinationsView = () => {
  const { name } = useParams();
  if (!name) return null;
  const { data, isFetching } = useCombinationQuery(name);
  return (
    <>
      {isFetching && <LoadingIndicator />}
      {data && <PlexPlaylist list={data} />}
    </>
  );
};
