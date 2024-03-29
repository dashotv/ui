import React, { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import Paper from '@mui/material/Paper';

import { ButtonMap, ButtonMapButton, LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { Medium } from 'components/Media/types';
import { Release, ReleasesForm, ReleasesList, SearchForm, useReleasesQuery } from 'components/Releases';
import { useQueryString } from 'hooks/queryString';

const pagesize = 25;

const processSearch = (medium: Medium) => {
  const { kind, search, display, episode_number, absolute_number } = medium;
  const isAnimeKind = ['anime', 'ecchi', 'donghua'].includes(kind);
  if (!search) {
    return { text: display, episode: episode_number };
  }
  if (!isAnimeKind || !search.includes(':') || !absolute_number || absolute_number === 0) {
    return { text: search, episode: episode_number };
  }

  const s = search.split(':');
  const text = s[0];
  const minus = Number(s[1]) || 0;
  return { text, episode: absolute_number - minus };
};

const formdata = (medium: Medium): SearchForm => {
  const { text, episode } = processSearch(medium);
  const { kind, season_number, search_params } = medium;
  const isAnimeKind = ['anime', 'ecchi', 'donghua'].includes(kind);

  return {
    text: text || '',
    year: '',
    season: isAnimeKind ? '' : season_number || '',
    episode: episode || '',
    group: search_params?.group || '',
    author: '',
    resolution: search_params?.resolution || '',
    source: search_params?.source || '',
    type: search_params?.type || '',
    exact: search_params?.exact || false,
    verified: search_params?.verified || false,
    uncensored: search_params?.uncensored || false,
    bluray: search_params?.bluray || false,
  };
};

export function Torch({
  medium,
  selector,
  selected,
}: {
  medium: Medium;
  selector: (release: Release) => void;
  selected?: { release_id: string; url: string };
}) {
  const { queryString } = useQueryString();
  const [initial] = useState(() => formdata(medium));
  const [form, setForm] = useState(initial);
  const [qs, setQs] = useState(() => queryString(form));
  const releases = useReleasesQuery(0, pagesize, qs);

  const click = useCallback(() => {
    console.log('click');
  }, []);

  const handleSelect = useCallback(
    (release: Release) => {
      selector(release);
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
      {releases.isFetching && <LoadingIndicator />}
      <Paper sx={{ mb: 2, p: 2, width: '100%' }}>
        <ReleasesForm form={form} setForm={setForm} reset={() => setForm(initial)} />
      </Paper>
      {releases.data && <ReleasesList data={releases.data?.Releases} actions={renderActions} selected={selected} />}
    </WrapErrorBoundary>
  );
}
