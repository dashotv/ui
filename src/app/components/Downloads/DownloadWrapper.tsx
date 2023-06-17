import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Download } from '../../../types/download';
import { useSubscription } from '../Nats/useSubscription';
import { DownloadBanner } from './index';
import { useReleases } from './useReleases';

export function DownloadWrapper(props) {
  const [download, setDownload] = useState<Download | null>(null);
  const { torrents, nzbs, nzbStatus } = useReleases();
  const { enqueueSnackbar } = useSnackbar();

  const changeSetting = useCallback(
    (setting, value) => {
      axios
        .put(`/api/tower/downloads/${props.id}`, {
          setting: setting,
          value: value,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    },
    [enqueueSnackbar, props.id],
  );

  const getDownloads = useCallback(() => {
    axios
      .get(`/api/tower/downloads/${props.id}`)
      .then(response => {
        // console.log(response.data);
        setDownload(response.data);
      })
      .catch(err => {
        enqueueSnackbar('error getting data', { variant: 'error' });
        console.error(err);
      });
  }, [enqueueSnackbar, setDownload, props.id]);

  useEffect(() => {
    getDownloads();
  }, [getDownloads]);

  useSubscription(
    'seer.downloads',
    useCallback(
      data => {
        if (download === null) {
          return;
        }

        if (download.id === data.id) {
          download.status = data.download.status;
          download.thash = data.download.thash;
          download.url = data.download.url;
          download.releaseId = data.download.releaseId;
        }
      },
      [download],
    ),
  );

  return (
    <>
      {download && (
        <DownloadBanner
          download={download}
          torrents={torrents}
          files={download?.download_files}
          nzbs={nzbs}
          nzbStatus={nzbStatus}
          change={changeSetting}
        />
      )}
    </>
  );
}
