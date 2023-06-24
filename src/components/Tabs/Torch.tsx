import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WavesIcon from '@mui/icons-material/Waves';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LoadingIndicator from 'components/Loading';
import { ReleasesList } from 'components/Releases/ReleasesList';
import { Search } from 'components/Search';
import { useQueryString } from 'hooks/useQueryString';
import { useReleaseGroup } from 'hooks/useReleaseGroup';
import { useReleaseResolution } from 'hooks/useReleaseResolution';

const pagesize = 25;
export function Torch(props) {
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState([]);
  const [form, setForm] = useState(props.form);
  const { enqueueSnackbar } = useSnackbar();
  const { queryString } = useQueryString();
  const { resolution } = useReleaseResolution();
  const { group } = useReleaseGroup();
  const { selector } = props;

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

  const click = useCallback(ev => {
    console.log('click');
  }, []);

  const handleSelect = useCallback(
    (ev, id) => {
      console.log('handleSelect:', ev, 'args:', id);
      selector(id);
    },
    [selector],
  );

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
            <IconButton size="small" onClick={click} title="view source">
              <OutboundRoundedIcon fontSize="small" color="primary" />
            </IconButton>
            <IconButton size="small" onClick={ev => handleSelect(ev, row.id)} title="select">
              <CheckCircleIcon fontSize="small" color="primary" />
            </IconButton>
          </ButtonGroup>
        </td>
      </tr>
    );
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      <Search form={form} setForm={setForm} />
      <ReleasesList data={releases} render={renderRow} />
    </>
  );
}
