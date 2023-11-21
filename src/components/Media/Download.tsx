import * as React from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

import { useQueryClient } from '@tanstack/react-query';

import { DownloadBanner } from 'components/Banner';
import { DownloadInfo } from 'components/Downloads';
import { FilesWithSelector } from 'components/Tabs/FilesWithSelector';
import { MediumTabs } from 'components/Tabs/MediumTabs';
import { Nzbgeek } from 'components/Tabs/Nzbgeek';
import { Torch } from 'components/Tabs/Torch';
import { useReleases } from 'hooks/useReleases';
import { useSub } from 'hooks/useSub';
import { useDownloadMutation, useDownloadSelectionMutation, useDownloadSettingMutation } from 'query/downloads';
import { useTorrentRemoveMutation } from 'query/releases';
import { DownloadFile, Download as DownloadType } from 'types/download';
import { Medium } from 'types/medium';
import { SearchForm } from 'types/search_form';
import { Torrent } from 'types/torrents';

import './Media.scss';

export type DownloadProps = {
  id: string;
  download: DownloadType;
  torrent?: Torrent;
  type: string;
  files?: DownloadFile[];
  episodes?: Medium[];
  torchSelector: (id: string) => void;
  nzbSelector: (id: string) => void;
};
export default function Download({
  id,
  // type,
  download,
  torrent,
  files,
  episodes,
  torchSelector,
  nzbSelector,
}: DownloadProps) {
  const {
    medium,
    status,
    thash,
    release_id,
    url,
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
  const [auto, setAuto] = useState(download.auto);
  const [multi, setMulti] = useState(download.multi);
  const [force, setForce] = useState(download.force);
  const downloadUpdate = useDownloadMutation(id);
  const downloadSetting = useDownloadSettingMutation(id);
  const downloadSelection = useDownloadSelectionMutation(id);
  const torrentRemove = useTorrentRemoveMutation();
  const queryClient = useQueryClient();
  const { progress, eta, queue } = useReleases();
  const navigate = useNavigate();

  function changeSetting(setting, value) {
    downloadSetting.mutate({ setting: setting, value: value });
  }

  function change(name, value) {
    downloadUpdate.mutate({ ...download, [name]: value });
  }

  function selectMedium(eid, num) {
    downloadSelection.mutate({ mediumId: eid, num: num });
  }

  const updateDownload = useCallback(
    data => {
      if (data.id !== id) {
        return;
      }
      console.log('update download', data);
      queryClient.setQueryData(['download', id], data);
    },
    [id, download],
  );

  useSub('seer.downloads', updateDownload);
  useSub('tower.downloads', updateDownload);

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
    Torch: <Torch form={torchForm()} selector={torchSelector} />,
    Nzbgeek: <Nzbgeek form={nzbForm()} selector={nzbSelector} />,
  };

  // TODO: create general MediaLink component or something like that
  const gotoMedia = useCallback(() => {
    if (!medium) {
      return;
    }
    let id = medium.id;
    let type = 'series';
    switch (medium.type) {
      case 'Episode':
        if (medium.series_id === undefined) {
          navigate('/404');
          return;
        }
        id = medium.series_id;
        break;
      case 'Series':
        break;
      case 'Movie':
        type = 'movies';
        break;
    }

    navigate('/' + type + '/' + id);
  }, [medium, navigate]);

  const remove = useCallback((status: string) => {
    console.log('clicked remove');
    torrentRemove.mutate(thash, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        change('status', status);
      },
    });
  }, []);

  const buttons = [
    {
      icon: <ArrowCircleLeftIcon color="primary" />,
      // click: <Link to={`/${props.download?.media?.type}/${props.download?.media?.id}`} />,
      click: () => gotoMedia(),
      title: 'Go to Media',
    },
    {
      icon: <CheckCircleIcon color="primary" />,
      click: () => remove('done'),
      title: 'mark complete',
    },
    {
      icon: <OfflineBoltIcon color={auto ? 'secondary' : 'action'} />,
      click: ev => {
        changeSetting('auto', !auto);
        setAuto(!auto);
        ev.preventDefault(); // for the buttons inside the Link component
      },
      title: 'toggle auto',
    },
    {
      icon: <PlaylistAddCheckCircleIcon color={multi ? 'secondary' : 'action'} />,
      click: ev => {
        changeSetting('multi', !multi);
        setMulti(!multi);
        ev.preventDefault(); // for the buttons inside the Link component
      },
      title: 'toggle multi',
    },
    {
      icon: <SwapHorizontalCircleIcon color={force ? 'secondary' : 'action'} />,
      click: ev => {
        changeSetting('force', !force);
        setForce(!force);
        ev.preventDefault(); // for the buttons inside the Link component
      },
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
        progress={progress(thash)?.toString()}
        queue={queue(thash)?.toString()}
        eta={eta(thash)?.toString()}
        buttons={buttons}
      />
      <DownloadInfo {...{ status, thash, release_id, url }} changer={change} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
