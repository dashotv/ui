import React, { Suspense, lazy, useState } from 'react';

import { DownloadSearch } from 'client/tower';

import { WrapErrorBoundary } from '@dashotv/components';

import { RunicForm } from 'components/Runic';

const RunicSearch = lazy(() => import('runic/Search'));
const RunicSearchWrapper = ({ search, selector, selected }: RunicSearchProps) => {
  const [rawForm] = useState<RunicForm>(formData(search));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RunicSearch {...{ rawForm, selector, selected }} />
    </Suspense>
  );
};

const formData = (search?: DownloadSearch): RunicForm => {
  return {
    text: search?.title || '',
    year: search?.year ? `${search.year}` : '',
    season: search?.season || '',
    episode: search?.episode || '',
    website: search?.group || '',
    group: '',
    resolution: search?.resolution || '',
    source: search?.source || '',
    type: search?.type || '',
    exact: search?.exact || false,
    verified: search?.verified || false,
    uncensored: search?.uncensored || false,
    bluray: search?.bluray || false,
  };
};
export interface RunicSearchProps {
  search?: DownloadSearch;
  selector: (url: string) => void;
  selected?: string;
}
export function Runic({ search, selector, selected }: RunicSearchProps) {
  return (
    <WrapErrorBoundary>
      <RunicSearchWrapper {...{ search, selector, selected }} />
    </WrapErrorBoundary>
  );
}
