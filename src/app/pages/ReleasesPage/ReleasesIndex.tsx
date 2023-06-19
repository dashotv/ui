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
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LoadingIndicator from '../../components/Loading';
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
        <Releases data={releases} />
      </Container>
    </>
  );
}

function Releases(props) {
  return (
    <div className="releases">
      <table className="vertical-table">
        <thead>
          <tr>
            <td className="number"></td>
            <td className="number"></td>
            <td className="date">Type</td>
            <td>Title</td>
            <td className="actions" align="right">
              Published
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map(row => (
              <ReleaseRow
                key={row.id}
                id={row.id}
                type={row.type}
                nzb={row.nzb}
                source={row.source}
                display={row.display}
                raw={row.raw}
                resolution={row.resolution}
                group={row.group}
                author={row.author}
                published={row.published_at}
                verified={row.verified}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function ReleaseRow(props) {
  const resolution = useCallback(r => {
    if (r) {
      return <Chip label={r} size="small" color="primary" />;
    }
    return;
  }, []);

  const group = useCallback(() => {
    if (props.group) {
      return <Typography variant="overline">{props.group}</Typography>;
    }
    if (props.author) {
      return <Typography variant="overline">[{props.author}]</Typography>;
    }
    return '';
  }, [props.author, props.group]);

  return (
    <tr>
      <td>
        {props.verified ? (
          <CheckCircleIcon color="primary" fontSize="small" />
        ) : (
          <CheckCircleOutlineIcon fontSize="small" />
        )}
      </td>
      <td>{props.nzb ? <ArticleIcon fontSize="small" /> : <WavesIcon fontSize="small" />}</td>
      <td>
        <Typography variant="overline">
          {props.source}:{props.type}
        </Typography>
      </td>
      <td>
        <Stack spacing={1} direction="row">
          <Link to={props.id} title={props.raw}>
            <Typography variant="subtitle1">{props.display}</Typography>
          </Link>
          {resolution(props.resolution)}
          {group()}
        </Stack>
      </td>
      <td align="right">
        <Moment fromNow>{props.published}</Moment>
      </td>
      <td align="right">
        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
