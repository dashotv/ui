import axios from 'axios';
import { Subscription } from 'nats.ws';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { Download } from '../../../types/download';
import { Torrent, TorrentsResponse } from '../../../types/torrents';
import { useReleases } from '../../components/Downloads/useReleases';
import LoadingIndicator from '../../components/Loading';
import MediumDownload from '../../components/MediumLarge/MediumDownload';
import { useSubscription } from '../../components/Nats/useSubscription';
import { useNats } from '../../components/Nats/usenats';

export default function DownloadsShowPage(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [download, setDownload] = useState<Download | null>(null);
  const { torrents, nzbs, nzbStatus } = useReleases();
  const { enqueueSnackbar } = useSnackbar();
  const { ws, jc } = useNats();

  // @ts-ignore
  let { id } = useParams();

  const getTorrent = useCallback(() => {
    if (torrents === null || download === null) {
      return;
    }
    return torrents.get(download.thash);
  }, [torrents, download]);

  useEffect(() => {
    const getDownload = () => {
      setLoading(true);
      axios
        .get(`/api/tower/downloads/${id}`)
        .then(response => {
          setDownload(response.data);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getDownload();
  }, [id, enqueueSnackbar]);

  return (
    <>
      <Helmet>
        <title>Series{download ? ` - ${download.medium.display}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {loading && <LoadingIndicator />}
        {download && (
          <MediumDownload
            id={id}
            type={download.medium.type}
            download={download}
            files={download.download_files}
            torrent={getTorrent()}
            torrents={torrents}
            nzbs={nzbs}
            nzbStatus={nzbStatus}
          />
        )}
      </Container>
    </>
  );
}
