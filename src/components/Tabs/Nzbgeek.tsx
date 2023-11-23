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

import { ButtonMap } from 'components/ButtonMap';
import LoadingIndicator from 'components/Loading';
import { Megabytes } from 'components/Releases/Megabytes';
import { Published } from 'components/Releases/Published';
import { useQueryString } from 'hooks/useQueryString';
import { Nzbgeek as NzbgeekType } from 'types/nzbgeek';
import { Release } from 'types/release';

const pagesize = 25;
export interface NzbgeekForm {
  tvdbid?: string;
  season?: number;
  episode?: number;
}
export function Nzbgeek({
  form: initial,
  selector,
}: {
  form: NzbgeekForm;
  selector: (selected: Release | NzbgeekType) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initial);
  const [nzbs, setNzbs] = useState<NzbgeekType[]>([]);

  const { enqueueSnackbar } = useSnackbar();
  const { queryString } = useQueryString();

  const handleSelect = useCallback(
    (selected: Release | NzbgeekType) => {
      selector(selected);
    },
    [selector],
  );

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

  const renderActions = (row: NzbgeekType) => {
    const buttons = [
      {
        icon: <OutboundRoundedIcon fontSize="small" color="primary" />,
        click: click,
        title: 'edit',
      },
      {
        icon: <CheckCircleIcon fontSize="small" color="primary" />,
        click: () => handleSelect(row),
        title: 'select',
      },
    ];
    return <ButtonMap buttons={buttons} />;
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      <Nzbsearch form={form} setForm={setForm} />
      <NzbList data={nzbs} actions={renderActions} />
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

function NzbList({ data, actions }: { data: NzbgeekType[]; actions: (row: NzbgeekType) => React.ReactNode }) {
  return (
    <div className="releases">
      <table className="vertical-table">
        <thead>
          <tr>
            <td className="number"></td>
            <td>Title</td>
            <td className="actions" align="right">
              Size
            </td>
            <td className="actions" align="right">
              Published
            </td>
            <td className="smaller" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>{data && data.map((row, index) => <NzbListRow key={index} {...{ row, actions }} />)}</tbody>
      </table>
    </div>
  );
}

function NzbListRow({
  row,
  row: {
    guid,
    pubDate: published,
    title,
    enclosure: { '@attributes': attributes },
  },
  actions,
}: {
  row: NzbgeekType;
  actions: (row: NzbgeekType) => React.ReactNode;
}) {
  return (
    <tr key={guid}>
      <td>
        <ArticleIcon fontSize="small" />
      </td>
      <td>
        <Link to={guid} title={title}>
          <Typography variant="subtitle1">{title}</Typography>
        </Link>
      </td>
      <td align="right">
        {attributes && attributes.length && <Megabytes value={Number(attributes.length)} ord="bytes" />}
      </td>
      <td align="right">{published && <Published date={published} />}</td>
      <td align="right">{actions(row)}</td>
    </tr>
  );
}
