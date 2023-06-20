import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

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
  const [releases, setReleases] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(formDefaults);
  const { enqueueSnackbar } = useSnackbar();
  const { queryString } = useQueryString();

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
    const getReleases = () => {
      setLoading(true);
      const start = (page - 1) * pagesize;
      const qs = queryString(form);
      axios
        .get(`/api/scry/releases/?start=${start}&limit=${pagesize}&${qs}`)
        .then(response => {
          console.log(response.data);
          setReleases(response.data.Releases);
          setCount(response.data.Total);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getReleases();
  }, [form, page, queryString, enqueueSnackbar]);

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
              count={Math.ceil(count / pagesize)}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        {loading && <LoadingIndicator />}
        <ReleasesList data={releases} actions={actions} />
      </Container>
    </>
  );
}
