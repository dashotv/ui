import React, { useCallback, useEffect, useState } from 'react';

import { DownloadSearch, Medium, Release } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import Paper from '@mui/material/Paper';

import { ButtonMap, ButtonMapButton, LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { ReleasesForm, ReleasesList, SearchForm, useReleasesQuery } from 'components/Releases';
import { useQueryString } from 'hooks/queryString';

const pagesize = 25;
const page = 1;

const formdata = (search?: DownloadSearch): SearchForm => {
  return {
    text: search?.title || '',
    year: search?.year ? `${search.year}` : '',
    season: search?.season || '',
    episode: search?.episode || '',
    group: search?.group || '',
    author: '',
    resolution: search?.resolution || '',
    source: search?.source || '',
    type: search?.type || '',
    exact: search?.exact || false,
    verified: search?.verified || false,
    uncensored: search?.uncensored || false,
    bluray: search?.bluray || false,
  };
};

export function Torch({
  search,
  selector,
  selected,
}: {
  search?: DownloadSearch;
  selector: (url: string) => void;
  selected?: string;
}) {
  const { queryString } = useQueryString();
  const [initial] = useState(() => formdata(search));
  const [form, setForm] = useState(initial);
  const [qs, setQs] = useState(() => queryString(form));
  const { isFetching, data } = useReleasesQuery(page, pagesize, form);

  const click = useCallback(() => {
    console.log('click');
  }, []);

  const handleSelect = useCallback(
    (release: Release) => {
      if (!release.download) return;
      selector(release.download);
    },
    [selector],
  );

  useEffect(() => {
    setQs(queryString(form));
  }, [form, setQs, queryString]);

  const renderActions = row => {
    const buttons: ButtonMapButton[] = [
      {
        Icon: OutboundRoundedIcon,
        color: 'primary',
        click: click,
        title: 'edit',
      },
      {
        Icon: CheckCircleIcon,
        color: 'primary',
        click: () => handleSelect(row),
        title: 're-process',
      },
    ];
    return <ButtonMap buttons={buttons} size="small" />;
  };

  // if (!releases.data) {
  //   return;
  // }

  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <Paper sx={{ mb: 2, p: 2, width: '100%' }}>
        <ReleasesForm form={form} setForm={setForm} reset={() => setForm(initial)} />
      </Paper>
      {data && <ReleasesList data={data?.Releases} actions={renderActions} selected={selected} />}
    </WrapErrorBoundary>
  );
}
