import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import WavesIcon from '@mui/icons-material/Waves';
import { autocompleteClasses } from '@mui/material';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LoadingIndicator from '../../components/Loading';
import { ReleasesList } from '../../components/Releases/ReleasesList';
import { Search } from '../../components/Search';
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

  const queryString = useCallback(form => {
    const str = [];
    for (const p in form)
      if (form.hasOwnProperty(p)) {
        // @ts-ignore
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(form[p]));
      }
    const qs = str.join('&');
    console.log('queryString=', qs);
    return qs;
  }, []);

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
      icon: <DeleteIcon fontSize="small" color="warning" />,
      click: click,
      title: 'delete from db',
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
