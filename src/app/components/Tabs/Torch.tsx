import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FourKIcon from '@mui/icons-material/FourK';
import TwoKIcon from '@mui/icons-material/TwoK';
import WavesIcon from '@mui/icons-material/Waves';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import LoadingIndicator from '../Loading';
import { Search } from '../Search';

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
export function Torch(props) {
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState([]);
  const [form, setForm] = useState(props.form);
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

  useEffect(() => {
    const getReleases = () => {
      setLoading(true);
      const qs = queryString(form);
      axios
        .get(`/api/scry/releases/?limit=${pagesize}&${qs}`)
        .then(response => {
          console.log(response.data);
          setReleases(response.data.Releases);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getReleases();
  }, [form, queryString, enqueueSnackbar]);

  return (
    <>
      {loading && <LoadingIndicator />}
      <Search form={form} setForm={setForm} />
      <TorchResults releases={releases} />
    </>
  );
}

function TorchResults(props) {
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
          {props.releases &&
            props.releases.map(
              ({ id, type, nzb, source, display, raw, resolution, group, author, published, verified }) => (
                <TorchResultsRow
                  key={id}
                  id={id}
                  type={type}
                  nzb={nzb}
                  display={display}
                  raw={raw}
                  verified={verified}
                  source={source}
                  resolution={resolution}
                  published={published}
                  author={author}
                  group={group}
                />
              ),
            )}
        </tbody>
      </table>
    </div>
  );
}

function TorchResultsRow(props) {
  const resolution = useCallback(r => {
    switch (r) {
      case '2160':
        return <FourKIcon color="primary" fontSize="small" />;
      case '1080':
        return <TwoKIcon color="secondary" fontSize="small" />;
      default:
        return '';
    }
  }, []);

  const group = useCallback(() => {
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
        <Typography variant="caption">
          {props.source}:{props.type}
        </Typography>
      </td>
      <td>
        <Link to={props.id} title={props.raw}>
          {props.display}
        </Link>
        {resolution(props.resolution)}
        {group()}
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
