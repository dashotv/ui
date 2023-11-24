import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ButtonMap } from 'components/ButtonMap';
import { Text } from 'components/Form';
import LoadingIndicator from 'components/Loading';
import { Megabytes } from 'components/Releases/Megabytes';
import { Published } from 'components/Releases/Published';
import { ResolutionTitle } from 'components/Releases/Resolution';
import { WrapErrorBoundary } from 'components/Util';
import { useQueryString } from 'hooks/useQueryString';
import { useNzbSearchTvQuery } from 'query/search';
import { Nzbgeek as NzbgeekType } from 'types/nzbgeek';
import { Release } from 'types/release';

export interface NzbgeekForm {
  tvdbid?: string;
  season?: number;
  episode?: number;
}
export function Nzbgeek({
  form: initial,
  selector,
  selected,
}: {
  form: NzbgeekForm;
  selector: (selected: Release | NzbgeekType) => void;
  selected?: { release_id: string; url: string };
}) {
  const { queryString } = useQueryString();
  const [form, setForm] = useState(initial);
  const [qs, setQs] = useState(queryString(form));
  const { isFetching, data: nzbs } = useNzbSearchTvQuery(qs);

  useEffect(() => {
    setQs(queryString(form));
  }, [form, queryString]);

  const handleSelect = useCallback(
    (selected: Release | NzbgeekType) => {
      selector(selected);
    },
    [selector],
  );

  const click = useCallback(() => {
    console.log('click');
  }, []);

  const renderActions = (row: NzbgeekType) => {
    const buttons = [
      {
        icon: <OutboundRoundedIcon fontSize="small" color="primary" />,
        click: click,
        title: 'edit',
      },
      {
        icon: <CheckCircleIcon fontSize="small" color="primary" />,
        click: () => handleSelect(row),
        title: 'select',
      },
    ];
    return <ButtonMap buttons={buttons} />;
  };

  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <Nzbsearch form={form} setForm={setForm} />
      {nzbs && <NzbList data={nzbs} actions={renderActions} selected={selected} />}
    </WrapErrorBoundary>
  );
}

function Nzbsearch({
  form,
  setForm,
}: {
  form: NzbgeekForm;
  setForm: React.Dispatch<React.SetStateAction<NzbgeekForm>>;
}) {
  const { handleSubmit, control } = useForm<NzbgeekForm>({ values: form });
  const submit = (data: NzbgeekForm) => {
    setForm(data);
  };
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, width: '100%' }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
          <Text name="tvdbid" control={control} />
          <Text name="season" control={control} />
          <Text name="episode" control={control} />
          <Button variant="contained" onClick={handleSubmit(submit)}>
            Go
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

function NzbList({
  data,
  actions,
  selected,
}: {
  data: NzbgeekType[];
  actions: (row: NzbgeekType) => React.ReactNode;
  selected?: { release_id: string; url: string };
}) {
  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {data && data.map((row, index) => <NzbListRow key={index} {...{ row, actions, selected }} />)}
    </Paper>
  );
}

function NzbListRow({
  row,
  row: {
    guid,
    pubDate: published,
    title,
    enclosure: { '@attributes': attributes },
  },
  actions,
  selected,
}: {
  row: NzbgeekType;
  actions: (row: NzbgeekType) => React.ReactNode;
  selected?: { release_id: string; url: string };
}) {
  const isSelected = (row: NzbgeekType) => {
    if (!selected) {
      return false;
    }
    return row.link === selected.url;
  };
  return (
    <Paper
      key={guid}
      elevation={1}
      sx={{ mb: 1, width: '100%', backgroundColor: isSelected(row) ? '#222266' : 'inherit' }}
    >
      <Stack
        sx={{ pr: 1, pl: 1 }}
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack width="100%" direction="row" spacing={1} alignItems="center" maxWidth={{ xs: '100%', md: '900px' }}>
          <ArticleIcon fontSize="small" />
          <Typography title={title} variant="h6" color="primary" noWrap>
            {title}
          </Typography>
          <ResolutionTitle title={title} />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', justifyContent: 'end' }}>
          {attributes && attributes.length && <Megabytes value={Number(attributes.length)} ord="bytes" />}
          {published && <Published date={published} />}
          {actions(row)}
        </Stack>
      </Stack>
    </Paper>
  );
}
