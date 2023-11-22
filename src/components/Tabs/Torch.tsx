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
import { SearchForm } from 'types/search_form';

const pagesize = 25;

export function Torch({
  form: initial,
  selector,
  selected,
}: {
  form: SearchForm;
  selector: (id: string) => void;
  selected?: { release_id: string; url: string };
}) {
  const { queryString } = useQueryString();
  const [qs, setQs] = useState(queryString(initial));
  const releases = useReleasesQuery(0, pagesize, qs);
  const [form, setForm] = useState(initial);

  const click = useCallback(() => {
    console.log('click');
  }, []);

  const handleSelect = useCallback(
    id => {
      selector(id);
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
        click: () => handleSelect(row.id),
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
