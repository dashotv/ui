import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import LoadingIndicator from 'components/Loading';
import { ReleasesList } from 'components/Releases/ReleasesList';
import { Search } from 'components/Search';
import { useQueryString } from 'hooks/useQueryString';

const pagesize = 25;
export function Torch(props) {
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState([]);
  const [form, setForm] = useState(props.form);
  const { enqueueSnackbar } = useSnackbar();
  const { queryString } = useQueryString();
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

  const renderActions = row => {
    return (
      <ButtonGroup>
        <IconButton size="small" onClick={click} title="view source">
          <OutboundRoundedIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton size="small" onClick={ev => handleSelect(ev, row.id)} title="select">
          <CheckCircleIcon fontSize="small" color="primary" />
        </IconButton>
      </ButtonGroup>
    );
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      <Search form={form} setForm={setForm} />
      <ReleasesList data={releases} actions={renderActions} />
    </>
  );
}
