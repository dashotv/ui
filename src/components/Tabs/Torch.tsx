import React, { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import Paper from '@mui/material/Paper';

import { ButtonMap } from 'components/ButtonMap';
import LoadingIndicator from 'components/Loading';
import { ReleasesList } from 'components/Releases/ReleasesList';
import { Search } from 'components/Search';
import { useQueryString } from 'hooks/useQueryString';
import { useReleasesQuery } from 'query/releases';
import { Release } from 'types/release';
import { SearchForm } from 'types/search_form';

const pagesize = 25;

export function Torch({
  form: initial,
  selector,
  selected,
}: {
  form: SearchForm;
  selector: (release: Release) => void;
  selected?: { release_id: string; url: string };
}) {
  const { queryString } = useQueryString();
  const [form, setForm] = useState(initial);
  const [qs, setQs] = useState(queryString(form));
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
    const buttons = [
      {
        icon: <OutboundRoundedIcon fontSize="small" color="primary" />,
        click: click,
        title: 'edit',
      },
      {
        icon: <CheckCircleIcon fontSize="small" color="primary" />,
        click: () => handleSelect(row),
        title: 're-process',
      },
    ];
    return <ButtonMap buttons={buttons} />;
  };

  if (!releases.data) {
    return;
  }

  return (
    <>
      {releases.isFetching && <LoadingIndicator />}
      <Paper sx={{ mb: 2, p: 2, width: '100%' }}>
        <Search form={form} setForm={setForm} reset={() => setForm(initial)} />
      </Paper>
      <ReleasesList data={releases.data?.Releases} actions={renderActions} selected={selected} />
    </>
  );
}
