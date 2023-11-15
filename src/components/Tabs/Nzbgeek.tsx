import axios from 'axios';
import { useSnackbar } from 'notistack';

import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ButtonMap, ButtonMapButton } from 'components/ButtonMap';
import Chrono from 'components/Chrono';
import LoadingIndicator from 'components/Loading';
import { useQueryString } from 'hooks/useQueryString';
import { Nzbgeek as NzbgeekType } from 'types/nzbgeek';

const pagesize = 25;
export interface NzbgeekForm {
  tvdbid: string;
  season: string;
  episode: string;
}
export function Nzbgeek({ form: initial }: { form: NzbgeekForm }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initial);
  const [nzbs, setNzbs] = useState<NzbgeekType[]>([]);

  const { enqueueSnackbar } = useSnackbar();
  const { queryString } = useQueryString();

  // TODO: change to react query
  useEffect(() => {
    const getNzbs = () => {
      setLoading(true);
      const qs = queryString(form);
      const t = 'tv';
      axios
        .get(`/api/scry/nzbs/${t}?limit=${pagesize}&${qs}`)
        .then(response => {
          console.log(response.data);
          setNzbs(response.data as NzbgeekType[]);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getNzbs();
  }, [form, queryString, enqueueSnackbar]);

  const click = useCallback(() => {
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

function Nzbsearch({
  form,
  setForm,
}: {
  form: NzbgeekForm;
  setForm: React.Dispatch<React.SetStateAction<NzbgeekForm>>;
}) {
  const [data, setData] = useState(form);

  const handleChange = ev => {
    setData({ ...form, [ev.target.name]: ev.target.value });
  };
  const handleSubmit = () => {
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

function NzbList({ data, actions }: { data: NzbgeekType[]; actions: ButtonMapButton[] }) {
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
          {data &&
            data.map(row => (
              <NzbListRow key={row.guid} id={row.guid} title={row.title} published={row.published} actions={actions} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function NzbListRow({
  id,
  published,
  title,
  actions,
}: {
  id: string;
  published: string;
  title: string;
  actions: ButtonMapButton[];
}) {
  return (
    <tr>
      <td>
        <ArticleIcon fontSize="small" />
      </td>
      <td>
        <Link to={id} title={title}>
          <Typography variant="subtitle1">{title}</Typography>
        </Link>
      </td>
      <td align="right">
        <Chrono fromNow>{published}</Chrono>
      </td>
      <td align="right">
        <ButtonMap buttons={actions} />
      </td>
    </tr>
  );
}
