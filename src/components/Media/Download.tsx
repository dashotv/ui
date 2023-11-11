import { useCallback } from 'react';
import * as React from 'react';

import { DownloadBanner } from 'components/Banner';
import { DownloadInfo } from 'components/Downloads';
import { useSubscription } from 'components/Nats/useSubscription';
import { FilesWithSelector } from 'components/Tabs/FilesWithSelector';
import { MediumTabs } from 'components/Tabs/MediumTabs';
import { Nzbgeek } from 'components/Tabs/Nzbgeek';
import { Torch } from 'components/Tabs/Torch';
import { useDownloadMutation, useDownloadSelectionMutation, useDownloadSettingMutation } from 'query/downloads';
import { Nzb, NzbResponseStatus } from 'types/Nzb';
import { DownloadFile, Download as DownloadType } from 'types/download';
import { Medium } from 'types/medium';
import { Torrent } from 'types/torrents';

import './Media.scss';

export type DownloadProps = {
  id: string;
  download: DownloadType;
  type: string;
  torrent?: Torrent;
  torrents?: Map<string, Torrent> | null;
  nzbs?: Map<number, Nzb> | null;
  nzbStatus?: NzbResponseStatus | null;
  files?: DownloadFile[];
  episodes?: Medium[];
  torchSelector: any;
  nzbSelector: any;
};
export default function Download({
  id,
  type,
  download,
  torrent,
  torrents,
  nzbs,
  nzbStatus,
  files,
  episodes,
  torchSelector,
  nzbSelector,
}: DownloadProps) {
  const {
    medium: { source_id, search, kind, season_number, episode_number, absolute_number, search_params },
  } = download;
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
          download.release_id = data.download.release_id;
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
    if (minus && absolute_number) {
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
      group: search_params?.group,
      author: '',
      resolution: search_params?.resolution,
      source: search_params?.source,
      type: search_params?.type,
      exact: search_params?.exact,
      verified: search_params?.verified,
    };
  }, [
    processSearch,
    kind,
    season_number,
    search_params?.exact,
    search_params?.group,
    search_params?.resolution,
    search_params?.source,
    search_params?.type,
    search_params?.verified,
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
    Files: <FilesWithSelector files={files} torrent={torrent} episodes={episodes} updater={selectMedium} />,
    Torch: <Torch form={torchForm()} selector={torchSelector} />,
    Nzbgeek: <Nzbgeek form={nzbForm()} selector={nzbSelector} />,
  };

  return (
    <div className="medium large">
      <DownloadBanner
        id={id}
        variant="large"
        download={download}
        torrents={torrents}
        nzbs={nzbs}
        nzbStatus={nzbStatus}
        change={changeSetting}
      />
      <DownloadInfo download={download} delete={deleteInfo} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
