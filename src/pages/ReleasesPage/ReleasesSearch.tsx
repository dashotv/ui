import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';

import LoadingIndicator from 'components/Loading';
import { ReleasesList } from 'components/Releases/ReleasesList';
import { Search } from 'components/Search';
import { useQueryString } from 'hooks/useQueryString';
import { useReleasesQuery } from 'query/releases';

import './releases.scss';

const pagesize = 25;
const formDefaults = {
  text: '',
  year: '',
  season: '',
  episode: '',
  group: '',
  author: '',
  resolution: '',
  source: '',
  type: '',
  exact: false,
  verified: false,
};

export default function ReleasesSearch() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(
    Object.assign(formDefaults, {
      text: searchParams.get('text') || '',
      type: searchParams.get('type') || '',
      resolution: searchParams.get('resolution') || '',
      exact: searchParams.get('exact') === 'true',
      verified: searchParams.get('verified') === 'true',
    }),
  );
  const { queryString } = useQueryString();
  const [page, setPage] = useState(1);
  const [qs, setQs] = useState(queryString(form));
  const { isFetching, data } = useReleasesQuery(page, pagesize, qs);

  const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const click = useCallback(ev => {
    console.log('click');
  }, []);

  useEffect(() => {
    console.log('setQs:');
    setQs(queryString(form));
  }, [form, queryString]);

  const renderActions = row => {
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
        {isFetching && <LoadingIndicator />}
        <Grid container>
          <Grid item xs={9}>
            <Search form={form} setForm={setForm} defaults={formDefaults} />
          </Grid>
          <Grid item xs={3} sx={{ pt: 3 }}>
            <Pagination
              siblingCount={1}
              boundaryCount={0}
              page={page}
              count={Math.ceil((data?.Total || 0) / pagesize)}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ overflow: 'hidden' }} maxWidth="xl">
        {data && <ReleasesList data={data.Releases} actions={renderActions} />}
      </Container>
    </>
  );
}
