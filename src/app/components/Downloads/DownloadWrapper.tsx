import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Download } from '../../../types/download';
import { useSubscription } from '../Nats/useSubscription';
import { DownloadBanner } from './index';
import { useReleases } from './useReleases';

export function DownloadWrapper(props) {
  const { id, download } = props;
  const { enqueueSnackbar } = useSnackbar();

  const changeSetting = useCallback(
    (setting, value) => {
      axios
        .put(`/api/tower/downloads/${id}`, {
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
    [enqueueSnackbar, id],
  );

  useSubscription(
    'seer.downloads',
    useCallback(
      data => {
        if (download === null) {
          return;
        }

        if (id === data.id) {
          download.status = data.download.status;
          download.thash = data.download.thash;
          download.url = data.download.url;
          download.releaseId = data.download.releaseId;
        }
      },
      [id, download],
    ),
  );

  return (
    <>
      {download && (
        <DownloadBanner
          download={download}
          files={download?.download_files}
          torrents={props.torrents}
          nzbs={props.nzbs}
          nzbStatus={props.nzbStatus}
          change={changeSetting}
        />
      )}
    </>
  );
}
