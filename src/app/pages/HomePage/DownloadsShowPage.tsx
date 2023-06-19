import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { Download } from '../../../types/download';
import { useReleases } from '../../components/Downloads/useReleases';
import LoadingIndicator from '../../components/Loading';
import MediumDownload from '../../components/MediumLarge/MediumDownload';

export default function DownloadsShowPage(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [download, setDownload] = useState<Download | null>(null);
  const [episodes, setEpisodes] = useState([]);
  const { torrents, nzbs, nzbStatus } = useReleases();
  const { enqueueSnackbar } = useSnackbar();

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
          console.log(response.data);
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
    const getEpisodes = () => {
      if (download?.medium?.type !== 'Series') {
        return;
      }
      axios
        .get(`/api/tower/series/${download.medium.id}/seasons/all`)
        .then(response => {
          console.log('getEpisodes:', response.data);
          setEpisodes(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getEpisodes();
  }, [download, download?.medium, enqueueSnackbar]);

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
            episodes={episodes}
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
