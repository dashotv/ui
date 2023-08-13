import { useCallback } from 'react';
import * as React from 'react';

import { DownloadBanner, DownloadInfo } from 'components/Downloads';
import { useSubscription } from 'components/Nats/useSubscription';
import { FilesWithSelector } from 'components/Tabs/FilesWithSelector';
import { MediumTabs } from 'components/Tabs/MediumTabs';
import { Nzbgeek } from 'components/Tabs/Nzbgeek';
import { Torch } from 'components/Tabs/Torch';
import { useDownloadMutation, useDownloadSelectionMutation, useDownloadSettingMutation } from 'query/downloads';

import './large.scss';

export default function MediumDownload(props) {
  const { id, download } = props;
  const { medium } = download;
  const { source_id, search, kind, season_number, episode_number, absolute_number, search_params } = medium;
  const downloadUpdate = useDownloadMutation(id);
  const downloadSetting = useDownloadSettingMutation(id);
  const downloadSelection = useDownloadSelectionMutation(id);

  function changeSetting(setting, value) {
    downloadSetting.mutate({ setting: setting, value: value });
  }

  function selectMedium(eid, num) {
    downloadSelection.mutate({ mediumId: eid, num: num });
  }

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

  const deleteInfo = ev => {
    console.log('deleteInfo');
    download.release_id = '';
    download.url = '';
    downloadUpdate.mutate(download);
  };

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
      <DownloadInfo download={props.download} delete={deleteInfo} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
