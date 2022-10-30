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

export default function ReleasesIndex() {
  const [releases, setReleases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReleases = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/scry/releases/');
        console.log(response.data);
        setReleases(response.data.Releases);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReleases();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Recent</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container maxWidth="xl">
        <Search />
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

function Search(props) {
  const defaults = {
    name: 'fuck',
    year: '2022',
  };
  const [data, setData] = useState(defaults);

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
          sx={{ m: 1 }}
          id="name"
          label="Name"
          variant="standard"
          margin="none"
          size="small"
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="year"
          label="Year"
          variant="standard"
          margin="none"
          size="small"
        />
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="season"
          label="Season"
          variant="standard"
          margin="none"
          size="small"
        />
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="episode"
          label="Episode"
          variant="standard"
          margin="none"
          size="small"
        />
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="group"
          label="Group"
          variant="standard"
          margin="none"
          size="small"
        />
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="author"
          label="Author"
          variant="standard"
          margin="none"
          size="small"
        />
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="resolution"
          select
          label="Res"
          variant="standard"
          margin="none"
          size="small"
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
          select
          label="Source"
          variant="standard"
          margin="none"
          size="small"
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
          select
          label="Type"
          variant="standard"
          margin="none"
          size="small"
        >
          {types.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Checkbox
          sx={{ mt: 2 }}
          icon={<CircleOutlinedIcon />}
          checkedIcon={<CircleIcon />}
        />
        <Checkbox
          sx={{ mt: 2 }}
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
        <Button sx={{ mt: 2 }}>Go</Button>
        <Button sx={{ mt: 2 }} onClick={ev => setData(defaults)}>
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
            <td></td>
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
        {props.source}:{props.type}
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
