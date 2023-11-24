import * as React from 'react';
import { useCallback, useState } from 'react';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

import { DownloadBanner } from 'components/Banner';
import { DownloadInfo } from 'components/Downloads';
import { MediaGo } from 'components/Media';
import { Nzbgeek as NzbgeekType } from 'components/Nzbgeek/types';
import { Release } from 'components/Releases/types';
import { SearchForm } from 'components/Releases/types';
import { FilesWithSelector } from 'components/Tabs/FilesWithSelector';
import { MediumTabs } from 'components/Tabs/MediumTabs';
import { Nzbgeek } from 'components/Tabs/Nzbgeek';
import { Torch } from 'components/Tabs/Torch';
import { useReleases } from 'hooks/useReleases';
import { useTorrentRemoveMutation } from 'query/releases';
import { DownloadFile, Download as DownloadType } from 'types/download';
import { Medium } from 'types/medium';
import { Torrent } from 'types/torrents';

export type DownloadProps = {
  id: string;
  download: DownloadType;
  torrent?: Torrent;
  type: string;
  files?: DownloadFile[];
  episodes?: Medium[];
  selectMedium: (eid: number | null, num: number) => void;
  selectRelease: (selected: Release | NzbgeekType) => void;
  changeSetting: (name: string, value: string | boolean) => void;
  changeInfo: (info: Partial<DownloadType>) => void;
};
export default function Download({
  id,
  // type,
  download,
  torrent,
  files,
  episodes,
  selectRelease,
  selectMedium,
  changeSetting,
  changeInfo,
}: DownloadProps) {
  const {
    status,
    thash,
    release_id,
    url,
    multi,
    auto,
    force,
    medium,
    medium: {
      // type,
      kind,
      // source,
      source_id,
      search_params,
      search,
      episode_number,
      season_number,
      absolute_number,
      cover,
      background,
      title,
      display,
    },
  } = download;
  const torrentRemove = useTorrentRemoveMutation();
  const { progress, eta, queue } = useReleases();
  const [open, setOpen] = useState(false);

  const processSearch = useCallback(() => {
    if (!search) {
      return { text: display, episode: episode_number };
    }
    const s = search.split(':');
    const text = s[0];
    const minus = Number(s[1]);
    let episode = episode_number;
    if (minus && absolute_number) {
      episode = absolute_number - minus;
    }
    return { text, episode };
  }, [absolute_number, episode_number, search]);

  const torchForm = useCallback(() => {
    const { text, episode } = processSearch();

    const data: SearchForm = {
      text: text || '',
      year: '',
      season: kind !== 'anime' ? season_number || '' : '',
      episode: episode || '',
      group: search_params?.group || '',
      author: '',
      resolution: search_params?.resolution || '',
      source: search_params?.source || '',
      type: search_params?.type || '',
      exact: search_params?.exact || false,
      verified: search_params?.verified || false,
      uncensored: search_params?.uncensored || false,
      bluray: search_params?.bluray || false,
    };
    return data;
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
    search_params?.uncensored,
    search_params?.bluray,
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
    Files: <FilesWithSelector files={files} torrent={torrent} episodes={episodes} updater={selectMedium} />,
    Torch: <Torch form={torchForm()} selector={selectRelease} selected={{ release_id, url }} />,
    Nzbgeek: <Nzbgeek form={nzbForm()} selector={selectRelease} selected={{ release_id, url }} />,
  };

  const remove = useCallback((status: string) => {
    console.log('clicked remove');
    torrentRemove.mutate(thash, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        changeSetting('status', status);
      },
    });
  }, []);

  const buttons = [
    {
      icon: <ArrowCircleLeftIcon color="primary" />,
      // click: <Link to={`/${props.download?.media?.type}/${props.download?.media?.id}`} />,
      click: () => MediaGo(medium.id, medium.type, medium.series_id),
      title: 'Go to Media',
    },
    {
      icon: <CheckCircleIcon color="primary" />,
      click: () => remove('done'),
      title: 'mark complete',
    },
    {
      icon: <OfflineBoltIcon color={auto ? 'secondary' : 'action'} />,
      click: () => changeSetting('auto', !auto),
      title: 'toggle auto',
    },
    {
      icon: <PlaylistAddCheckCircleIcon color={multi ? 'secondary' : 'action'} />,
      click: () => changeSetting('multi', !multi),
      title: 'toggle multi',
    },
    {
      icon: <SwapHorizontalCircleIcon color={force ? 'secondary' : 'action'} />,
      click: () => changeSetting('force', !force),
      title: 'toggle force',
    },
    {
      icon: <CancelIcon color="error" />,
      click: () => remove('deleted'),
      title: 'delete',
    },
  ];

  return (
    <div className="medium large">
      <DownloadBanner
        id={id}
        title={title}
        subtitle={display}
        cover={cover}
        background={background}
        status={status}
        statusAction={() => {
          setOpen(true);
        }}
        progress={progress(thash)?.toString()}
        queue={queue(thash)?.toString()}
        eta={eta(thash)?.toString()}
        buttons={buttons}
      />
      <DownloadInfo {...{ open, setOpen, status, thash, release_id, url }} changer={changeInfo} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
