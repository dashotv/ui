import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WavesIcon from '@mui/icons-material/Waves';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LoadingIndicator from 'components/Loading';
import { ReleasesList } from 'components/Releases/ReleasesList';
import { Search } from 'components/Search';
import { useQueryString } from 'hooks/useQueryString';
import { useReleaseGroup } from 'hooks/useReleaseGroup';
import { useReleaseResolution } from 'hooks/useReleaseResolution';
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

export default function ReleasesIndex() {
  const [form, setForm] = useState(formDefaults);
  const { queryString } = useQueryString();
  const [page, setPage] = useState(1);
  const [qs, setQs] = useState(queryString(form));
  const { resolution } = useReleaseResolution();
  const { group } = useReleaseGroup();

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

  const renderRow = row => {
    return (
      <tr key={row.id}>
        <td>
          {row.verified ? (
            <CheckCircleIcon color="primary" fontSize="small" />
          ) : (
            <CheckCircleOutlineIcon fontSize="small" />
          )}
        </td>
        <td>{row.nzb ? <ArticleIcon fontSize="small" /> : <WavesIcon fontSize="small" />}</td>
        <td>
          <Typography variant="overline">
            {row.source}:{row.type}
          </Typography>
        </td>
        <td>
          <Stack spacing={1} direction="row">
            <Link to={row.id} title={row.raw}>
              <Typography variant="subtitle1">{row.display}</Typography>
            </Link>
            {resolution(row.resolution)}
            {group(row.group, row.author)}
          </Stack>
        </td>
        <td align="right">
          <Moment fromNow>{row.published}</Moment>
        </td>
        <td align="right">
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
        </td>
      </tr>
    );
  };

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
        {data && <ReleasesList data={data.Releases} render={renderRow} />}
      </Container>
    </>
  );
}
