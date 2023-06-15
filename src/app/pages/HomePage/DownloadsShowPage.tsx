import axios from 'axios';
import { Subscription } from 'nats.ws';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { Download } from '../../../types/download';
import { Torrent, TorrentsResponse } from '../../../types/torrents';
import LoadingIndicator from '../../components/Loading';
import MediumDownload from '../../components/MediumLarge/MediumDownload';
import { useNats } from '../../components/Nats/usenats';

export default function DownloadsShowPage(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [download, setDownload] = useState<Download | null>(null);
  const [torrent, setTorrent] = useState<Torrent | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { ws, jc } = useNats();

  // @ts-ignore
  let { id } = useParams();

  const handleTorrents = useCallback(
    (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }

      const data = jc.decode(msg.data) as TorrentsResponse;
      // console.log('torrents:', data);
      if (data.Torrents.length > 0) {
        for (const t of data.Torrents) {
          if (t.Hash === download?.thash) {
            setTorrent(t);
          }
        }
      }
    },
    [jc, setTorrent, download],
  );

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

  useEffect(() => {
    let sub1: Subscription | null = null;
    // let sub2: Subscription | null = null;
    ws.then(nc => {
      sub1 = nc.subscribe('flame.qbittorrents', { callback: handleTorrents });
      // sub2 = nc.subscribe('flame.nzbs', { callback: handleNzbs });
    });

    return () => {
      sub1?.unsubscribe();
      // sub2?.unsubscribe();
    };
  }, [ws, handleTorrents]);

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
            id={download.id}
            type={download.medium.type}
            download={download}
            files={download.download_files}
            torrent={torrent}
          />
        )}
      </Container>
    </>
  );
}
