import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import * as React from 'react';

import { DownloadBanner, DownloadInfo } from '../Downloads';
import { useSubscription } from '../Nats/useSubscription';
import { FilesWithSelector } from '../Tabs/FilesWithSelector';
import { MediumTabs } from '../Tabs/MediumTabs';
import { Nzbgeek } from '../Tabs/Nzbgeek';
import { Torch } from '../Tabs/Torch';
import './large.scss';

export default function MediumDownload(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { id, download } = props;
  const { medium } = download;
  const { source_id, search, kind, season_number, episode_number, absolute_number, search_params } = medium;

  const changeSetting = useCallback(
    (setting, value) => {
      axios
        .patch(`/api/tower/downloads/${id}`, {
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

  const processSearch = useCallback(() => {
    let s = search.split(':');
    let text = s[0];
    let minus = Number(s[1]);
    let episode = episode_number;
    if (minus) {
      episode = absolute_number - minus;
    }
    return { text, episode };
  }, [absolute_number, episode_number, search]);

  const torchForm = useCallback(() => {
    const { text, episode } = processSearch();

    return {
      text: text,
      year: '',
      season: kind !== 'anime' ? season_number : '',
      episode: episode,
      group: search_params.group,
      author: '',
      resolution: search_params.resolution,
      source: search_params.source,
      type: search_params.type,
      exact: search_params.exact,
      verified: search_params.verified,
    };
  }, [
    processSearch,
    kind,
    season_number,
    search_params.exact,
    search_params.group,
    search_params.resolution,
    search_params.source,
    search_params.type,
    search_params.verified,
  ]);

  const nzbForm = useCallback(() => {
    const { episode } = processSearch();
    return {
      tvdbid: source_id,
      season: season_number,
      episode: episode,
    };
  }, [season_number, source_id, processSearch]);

  const tabsMap = {
    Files: (
      <FilesWithSelector files={props.files} torrent={props.torrent} episodes={props.episodes} updater={selectMedium} />
    ),
    Torch: <Torch form={torchForm()} selector={props.torchSelector} />,
    Nzbgeek: <Nzbgeek form={nzbForm()} selector={props.nzbSelector} />,
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
      <DownloadInfo download={props.download} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
