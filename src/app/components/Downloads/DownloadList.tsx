import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Download } from '../../../types/download';
import { useSubscription } from '../Nats/useSubscription';
import { DownloadBanner } from './index';
import { useReleases } from './useReleases';

export function DownloadList(props) {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const { torrents, nzbs, nzbStatus } = useReleases();
  const { enqueueSnackbar } = useSnackbar();

  const getDownloads = useCallback(() => {
    axios
      .get('/api/tower/downloads/')
      .then(response => {
        // console.log(response.data);
        setDownloads(response.data);
      })
      .catch(err => {
        enqueueSnackbar('error getting data', { variant: 'error' });
        console.error(err);
      });
  }, [enqueueSnackbar]);

  useSubscription(
    'seer.downloads',
    useCallback(
      data => {
        if (data.event === 'created') {
          // if a download is created, just get the downloads again
          getDownloads();
          return;
        }

        if (data.event === 'destroyed' || data.download.status === 'done') {
          // if a download was destroyed or completed, remove from list
          setDownloads(prevState => prevState.filter(item => item.id !== data.id));
          return;
        }

        // otherwise, update the download that was changed
        setDownloads(prevState => {
          return prevState.map(item => {
            if (item.id === data.id) {
              item.status = data.download.status;
              item.thash = data.download.thash;
              item.url = data.download.url;
              item.releaseId = data.download.releaseId;
            }
            return item;
          });
        });
      },
      [getDownloads, setDownloads],
    ),
  );

  useEffect(() => {
    getDownloads();
  }, [getDownloads]);

  return (
    <div>
      {downloads.map(download => (
        <Link key={download.id} to={`/downloads/${download.id}`}>
          <DownloadBanner download={download} torrents={torrents} nzbs={nzbs} nzbStatus={nzbStatus} />
        </Link>
      ))}
    </div>
  );
}
