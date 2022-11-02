import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Moment from 'react-moment';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import ArticleIcon from '@mui/icons-material/Article';
import WavesIcon from '@mui/icons-material/Waves';
import FourKIcon from '@mui/icons-material/FourK';
import TwoKIcon from '@mui/icons-material/TwoK';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';

import './releases.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import SubNav from '../../components/SubNav';

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(formDefaults);

  useEffect(() => {
    const getReleases = async () => {
      setLoading(true);
      try {
        const start = (page - 1) * pagesize;
        const qs = queryString(form);
        const response = await axios.get(
          `/api/scry/releases/?start=${start}&limit=${pagesize}&${qs}`,
        );
        console.log(response.data);
        setReleases(response.data.Releases);
        setCount(response.data.Total);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReleases();
  }, [form, page]);

  const search = data => {
    setForm(data);
  };

  const queryString = form => {
    const str = [];
    for (const p in form)
      if (form.hasOwnProperty(p)) {
        // @ts-ignore
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(form[p]));
      }
    const qs = str.join('&');
    console.log('queryString=', qs);
    return qs;
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log('setPage=', value);
    setPage(value);
  };
  const items = [
    { name: 'Releases', path: '/releases' },
    { name: 'Feeds', path: '/releases/feeds' },
  ];

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>

      <Container sx={{ padding: 1 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={9}>
            <Search form={form} search={search} />
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
        {loading && (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        )}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <Releases data={releases} />
      </Container>
    </>
  );
}

interface SearchForm {
  text: string;
  year: string;
  season: string;
  episode: string;
  group: string;
  author: string;
  resolution: string;
  source: string;
  type: string;
  exact: boolean;
  verified: boolean;
}

function Search(props) {
  const [data, setData] = useState<SearchForm>(props.form);

  const resolutions = [
    { label: '', value: '' },
    { label: '2160p', value: 2160 },
    { label: '1080p', value: 1080 },
    { label: '720p', value: 720 },
  ];
  const types = [
    { label: '', value: '' },
    { label: 'tv', value: 'tv' },
    { label: 'anime', value: 'anime' },
    { label: 'movies', value: 'movies' },
  ];
  const sources = [
    { label: '', value: '' },
    { label: 'anidex', value: 'anidex' },
    { label: 'extratorrent', value: 'extratorrent' },
    { label: 'eztv', value: 'eztv' },
    { label: 'geek', value: 'geek' },
    { label: 'hiddenbay', value: 'hiddenbay' },
    { label: 'horrible', value: 'horrible' },
    { label: 'kickass', value: 'kickass' },
    { label: 'lime', value: 'lime' },
    { label: 'monova', value: 'monova' },
    { label: 'nyaa', value: 'nyaa' },
    { label: 'piratebay', value: 'piratebay' },
    { label: 'rarbg', value: 'rarbg' },
    { label: 'shana', value: 'shana' },
    { label: 'showrss', value: 'showrss' },
    { label: 'yify', value: 'yify' },
  ];
  const handleChange = ev => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };
  const handleChangeCheckbox = ev => {
    setData({ ...data, [ev.target.name]: ev.target.checked });
  };
  const handleSubmit = ev => {
    console.log('form:', data);
    props.search(data);
  };
  const handleReset = ev => {
    setData(formDefaults);
  };
  return (
    <>
      <Box
        component="form"
        // sx={{
        //   '& > :not(style)': { m: 1 },
        // }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="text"
          name="text"
          label="Name"
          variant="standard"
          margin="none"
          size="small"
          value={data.text}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="year"
          name="year"
          label="Year"
          variant="standard"
          margin="none"
          size="small"
          value={data.year}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="season"
          name="season"
          label="Season"
          variant="standard"
          margin="none"
          size="small"
          value={data.season}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="episode"
          name="episode"
          label="Episode"
          variant="standard"
          margin="none"
          size="small"
          value={data.episode}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="group"
          name="group"
          label="Group"
          variant="standard"
          margin="none"
          size="small"
          value={data.group}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="author"
          name="author"
          label="Author"
          variant="standard"
          margin="none"
          size="small"
          value={data.author}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="resolution"
          name="resolution"
          select
          label="Res"
          variant="standard"
          margin="none"
          size="small"
          value={data.resolution}
          onChange={handleChange}
        >
          {resolutions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="source"
          name="source"
          select
          label="Source"
          variant="standard"
          margin="none"
          size="small"
          value={data.source}
          onChange={handleChange}
        >
          {sources.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="type"
          name="type"
          select
          label="Type"
          variant="standard"
          margin="none"
          size="small"
          value={data.type}
          onChange={handleChange}
        >
          {types.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Checkbox
          sx={{ mt: 2 }}
          name="exact"
          icon={<CircleOutlinedIcon />}
          checkedIcon={<CircleIcon />}
          checked={data.exact}
          onChange={handleChangeCheckbox}
        />
        <Checkbox
          sx={{ mt: 2 }}
          name="verified"
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={data.verified}
          onChange={handleChangeCheckbox}
        />
        <Button sx={{ mt: 2 }} onClick={handleSubmit}>
          Go
        </Button>
        <Button sx={{ mt: 2 }} onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </>
  );
}

function Releases(props) {
  return (
    <div className="releases">
      <table>
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
  function resolution(r) {
    switch (r) {
      case '2160':
        return <FourKIcon color="primary" fontSize="small" />;
      case '1080':
        return <TwoKIcon color="secondary" fontSize="small" />;
      default:
        return '';
    }
  }

  function group() {
    if (props.group) {
      return (
        <Typography className="spacer" variant="caption">
          {props.group}
        </Typography>
      );
    }
    if (props.author) {
      return (
        <Typography className="spacer" variant="caption">
          [{props.author}]
        </Typography>
      );
    }
    return '';
  }
  return (
    <tr>
      <td>
        {props.verified ? (
          <CheckCircleIcon color="primary" fontSize="small" />
        ) : (
          <CheckCircleOutlineIcon fontSize="small" />
        )}
      </td>
      <td>
        {props.nzb ? (
          <ArticleIcon fontSize="small" />
        ) : (
          <WavesIcon fontSize="small" />
        )}
      </td>
      <td>
        <Typography variant="caption">
          {props.source}:{props.type}
        </Typography>
      </td>
      <td>
        <span title={props.raw}>
          <Link to={`releases/${props.id}`}>{props.display}</Link>
          {resolution(props.resolution)}
          {group()}
        </span>
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
