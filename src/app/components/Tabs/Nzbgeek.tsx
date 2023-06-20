import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ButtonMap from '../ButtonMap';
import LoadingIndicator from '../Loading';
import { useQueryString } from '../Utils/useQueryString';

const pagesize = 25;
export function Nzbgeek(props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(props.form);
  const [nzbs, setNzbs] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const { queryString } = useQueryString();

  useEffect(() => {
    const getNzbs = () => {
      setLoading(true);
      const qs = queryString(form);
      const t = 'tv';
      axios
        .get(`/api/scry/nzbs/${t}?limit=${pagesize}&${qs}`)
        .then(response => {
          console.log(response.data);
          setNzbs(response.data);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getNzbs();
  }, [form, queryString, enqueueSnackbar]);

  const click = useCallback(ev => {
    console.log('click');
  }, []);

  const actions = [
    {
      icon: <OutboundRoundedIcon fontSize="small" color="primary" />,
      click: click,
      title: 'view source',
    },
    {
      icon: <CheckCircleIcon fontSize="small" color="primary" />,
      click: click,
      title: 'select',
    },
  ];

  return (
    <>
      {loading && <LoadingIndicator />}
      <Nzbsearch form={form} setForm={setForm} />
      <NzbList data={nzbs} actions={actions} />
    </>
  );
}

function Nzbsearch({ form, setForm }) {
  const [data, setData] = useState(form);

  const handleChange = ev => {
    setData({ ...form, [ev.target.name]: ev.target.value });
  };
  const handleSubmit = ev => {
    setForm(data);
  };
  return (
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
        id="tvdbid"
        name="tvdbid"
        label="TVDBID"
        variant="standard"
        margin="none"
        size="small"
        value={data.tvdbid}
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
      <Button sx={{ mt: 2 }} onClick={handleSubmit}>
        Go
      </Button>
    </Box>
  );
}

function NzbList(props) {
  return (
    <div className="releases">
      <table className="vertical-table">
        <thead>
          <tr>
            <td className="number"></td>
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
              <NzbListRow
                key={row.Guid}
                id={row.Guid}
                title={row.title}
                published={row.pubDate}
                actions={props.actions}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function NzbListRow(props) {
  return (
    <tr>
      <td>
        <ArticleIcon fontSize="small" />
      </td>
      <td>
        <Link to={props.id} title={props.raw}>
          <Typography variant="subtitle1">{props.title}</Typography>
        </Link>
      </td>
      <td align="right">
        <Moment fromNow>{props.published}</Moment>
      </td>
      <td align="right">
        <ButtonMap buttons={props.actions} />
      </td>
    </tr>
  );
}
