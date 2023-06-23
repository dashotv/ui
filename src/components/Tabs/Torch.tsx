import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';

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
    (ev, args) => {
      const [id] = args;
      console.log('handleSelect:', ev, 'args:', args);
      selector(id);
    },
    [selector],
  );

  const actions = [
    {
      icon: <OutboundRoundedIcon fontSize="small" color="primary" />,
      click: click,
      title: 'view source',
    },
    {
      icon: <CheckCircleIcon fontSize="small" color="primary" />,
      click: handleSelect,
      title: 'select',
    },
  ];

  return (
    <>
      {loading && <LoadingIndicator />}
      <Search form={form} setForm={setForm} />
      <ReleasesList data={releases} actions={actions} />
    </>
  );
}
