import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import * as React from 'react';

import { DownloadBanner } from '../Downloads';
import { useSubscription } from '../Nats/useSubscription';
import { FilesWithSelector } from '../Tabs/FilesWithSelector';
import { MediumTabs } from '../Tabs/MediumTabs';
import { Torch } from '../Tabs/Torch';
import './large.scss';

export default function MediumDownload(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { id, download } = props;

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

  const selectMedium = useCallback(
    (eid, num) => {
      axios
        .put(`/api/tower/downloads/${id}/select`, {
          mediumId: eid,
          num: num,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    },
    [id, enqueueSnackbar],
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

  const tabsMap = {
    Files: (
      <FilesWithSelector files={props.files} torrent={props.torrent} episodes={props.episodes} updater={selectMedium} />
    ),
  };

  return (
    <div className="medium large">
      <DownloadBanner
        id={id}
        download={props.download}
        torrents={props.torrents}
        nzbs={props.nzbs}
        nzbStatus={props.nzbStatus}
        change={changeSetting}
      />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
