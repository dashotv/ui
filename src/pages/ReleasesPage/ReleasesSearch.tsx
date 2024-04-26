import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { Container, LoadingIndicator, Pagination } from '@dashotv/components';

import { ReleasesForm, ReleasesList, ReleasesPresets, SearchForm, useReleasesQuery } from 'components/Releases';

const pagesize = 25;
const formDefaults: SearchForm = {
  text: '',
  year: '',
  season: '',
  episode: '',
  group: '',
  author: '',
  resolution: '',
  source: '',
  type: '',
  uncensored: false,
  bluray: false,
  verified: false,
  exact: false,
};

// TODO: useForm and @hookform/devtools, see: https://www.youtube.com/watch?v=sD9fZxMO1us
export default function ReleasesSearchPage() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<SearchForm>(
    Object.assign(formDefaults, {
      text: searchParams.get('text') || '',
      type: searchParams.get('type') || '',
      resolution: searchParams.get('resolution') || '',
      exact: searchParams.get('exact') === 'true',
      verified: searchParams.get('verified') === 'true',
      uncensored: searchParams.get('uncensored') === 'true',
      bluray: searchParams.get('bluray') === 'true',
    }),
  );
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  // const [qs, setQs] = useState(queryString(form));
  const { isFetching, data } = useReleasesQuery(page, pagesize, form);

  const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const reset = () => {
    setForm(formDefaults);
    setPage(1);
  };

  useEffect(() => {
    if (!data?.Total) return;
    setCount(Math.ceil((data.Total || 0) / pagesize)); // Math.ceil((data?.count || 0) / pagesize)
    setTotal(data.Total);
  }, [data?.Total]);

  // useEffect(() => {
  //   setQs(queryString(form));
  // }, [form, queryString]);

  const renderActions = () => {
    // const buttons: ButtonMapButton[] = [
    //   {
    //     Icon: SvgIcon,
    //     Component: RiEditCircleFill,
    //     color: 'primary',
    //     click: click,
    //     title: 'edit',
    //   },
    //   {
    //     Icon: ReplayCircleFilledIcon,
    //     color: 'warning',
    //     click: click,
    //     title: 're-process',
    //   },
    //   {
    //     Icon: CancelIcon,
    //     color: 'error',
    //     click: click,
    //     title: 'delete',
    //   },
    // ];
    // return <ButtonMap buttons={buttons} size="small" />;
    return <></>;
  };

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>

      <Container>
        <Paper sx={{ p: 1, width: '100%' }}>
          {isFetching && <LoadingIndicator />}
          <ReleasesForm form={form} setForm={setForm} reset={reset} />
        </Paper>
      </Container>
      <Container>
        <Paper sx={{ p: 1, width: '100%' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems="center"
            sx={{ width: '100%', justifyContent: 'space-between' }}
          >
            <ReleasesPresets {...{ setForm, setPage, formDefaults }} />
            <Pagination
              boundaryCount={0}
              siblingCount={0}
              page={page}
              total={total}
              count={count}
              onChange={handleChange}
            />
          </Stack>
        </Paper>
      </Container>
      <Container>{data && <ReleasesList data={data?.Releases} actions={renderActions} />}</Container>
    </>
  );
}
