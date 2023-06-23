import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { useReleasesQuery } from '../../../query/releases';
import LoadingIndicator from '../../components/Loading';
import { ReleasesList } from '../../components/Releases/ReleasesList';
import { Search } from '../../components/Search';
import { useQueryString } from '../../components/Utils/useQueryString';
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

export default function ReleasesIndex() {
  const [form, setForm] = useState(formDefaults);
  const { queryString } = useQueryString();
  const [page, setPage] = useState(1);
  const [qs, setQs] = useState(queryString(form));

  const { isFetching, data } = useReleasesQuery(page, pagesize, qs);

  const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    console.log('setPage=', value);
    setPage(value);
  }, []);

  const click = useCallback(ev => {
    console.log('click');
  }, []);

  const actions = [
    {
      icon: <EditIcon fontSize="small" color="primary" />,
      click: click,
      title: 'Edit',
    },
    {
      icon: <RestartAltIcon fontSize="small" color="warning" />,
      click: click,
      title: 're-process',
    },
    {
      icon: <DeleteForeverIcon fontSize="small" color="error" />,
      click: click,
      title: 'delete from db and disk',
    },
  ];

  useEffect(() => {
    console.log('setQs:');
    setQs(queryString(form));
  }, [form, queryString]);

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>

      <Container sx={{ padding: 1 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={9}>
            <Search form={form} setForm={setForm} defaults={formDefaults} />
          </Grid>
          <Grid item xs={3}>
            <Pagination
              sx={{ mt: 3 }}
              siblingCount={0}
              boundaryCount={1}
              page={page}
              count={Math.ceil((data?.Total || 0) / pagesize)}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <ReleasesList data={data.Releases} actions={actions} />}
      </Container>
    </>
  );
}
