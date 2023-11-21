import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';

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

  const click = useCallback(() => {
    console.log('click');
  }, []);

  useEffect(() => {
    console.log('setQs:');
    setQs(queryString(form));
  }, [form, queryString]);

  const renderActions = () => {
    return (
      <ButtonGroup>
        <IconButton size="small" onClick={click} title="edit">
          <EditIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton size="small" onClick={click} title="re-process">
          <RestartAltIcon fontSize="small" color="warning" />
        </IconButton>
        <IconButton size="small" onClick={click} title="delete">
          <DeleteForeverIcon fontSize="small" color="error" />
        </IconButton>
      </ButtonGroup>
    );
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
          <Search form={form} setForm={setForm} />
        </Paper>
      </Container>
      <Container style={{ overflow: 'hidden' }} maxWidth="xl">
        <Paper sx={{ mb: 2, p: 2, width: '100%' }}>
          <Pagination
            boundaryCount={0}
            page={page}
            count={Math.ceil((data?.Total || 0) / pagesize)}
            onChange={handleChange}
          />
        </Paper>
      </Container>
      <Container style={{ overflow: 'hidden' }} maxWidth="xl">
        {data && <ReleasesList data={data.Releases} actions={renderActions} />}
      </Container>
    </>
  );
}
