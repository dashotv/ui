import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RiEditCircleFill } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';

import CancelIcon from '@mui/icons-material/Cancel';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import { ButtonMap } from 'components/ButtonMap';
import LoadingIndicator from 'components/Loading';
import { ReleasesList } from 'components/Releases/ReleasesList';
import { Search } from 'components/Search';
import { useQueryString } from 'hooks/useQueryString';
import { useReleasesQuery } from 'query/releases';
import { SearchForm } from 'types/search_form';

import './releases.scss';

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
export default function ReleasesSearch() {
  const { queryString } = useQueryString();
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
  const [qs, setQs] = useState(queryString(form));
  const { isFetching, data } = useReleasesQuery(page, pagesize, qs);

  const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const reset = () => {
    setForm(formDefaults);
    setPage(1);
  };

  const click = useCallback(() => {
    console.log('click');
  }, []);

  useEffect(() => {
    console.log('setQs:');
    setQs(queryString(form));
  }, [form, queryString]);

  const renderActions = () => {
    const buttons = [
      {
        icon: <SvgIcon component={RiEditCircleFill} inheritViewBox fontSize="small" color="primary" />,
        click: click,
        title: 'edit',
      },
      {
        icon: <ReplayCircleFilledIcon color="warning" />,
        click: click,
        title: 're-process',
      },
      {
        icon: <CancelIcon color="error" />,
        click: click,
        title: 'delete',
      },
    ];
    return <ButtonMap buttons={buttons} />;
  };

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>

      <Container style={{ overflow: 'hidden' }} maxWidth="xl">
        <Paper sx={{ mb: 2, p: 2, width: '100%' }}>
          {isFetching && <LoadingIndicator />}
          <Search form={form} setForm={setForm} reset={reset} />
        </Paper>
      </Container>
      <Container style={{ overflow: 'hidden' }} maxWidth="xl">
        <Paper sx={{ mb: 2, p: 2, width: '100%' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems="center"
            sx={{ width: '100%', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => {
                  setPage(1);
                  setForm(() => {
                    return { ...formDefaults, type: 'movies', resolution: 1080, verified: true };
                  });
                }}
                size="small"
                variant="contained"
              >
                Movies
              </Button>
              <Button
                onClick={() => {
                  setPage(1);
                  setForm(() => {
                    return { ...formDefaults, verified: true, type: 'anime', uncensored: true };
                  });
                }}
                size="small"
                variant="contained"
              >
                UN
              </Button>
              <Button
                onClick={() => {
                  setPage(1);
                  setForm(() => {
                    return { ...formDefaults, verified: true, type: 'anime', bluray: true };
                  });
                }}
                size="small"
                variant="contained"
              >
                BD
              </Button>
            </Stack>
            <Pagination
              boundaryCount={0}
              page={page}
              count={Math.ceil((data?.Total || 0) / pagesize)}
              onChange={handleChange}
            />
          </Stack>
        </Paper>
      </Container>
      <Container style={{ overflow: 'hidden' }} maxWidth="xl">
        {data && <ReleasesList data={data.Releases} actions={renderActions} />}
      </Container>
    </>
  );
}
