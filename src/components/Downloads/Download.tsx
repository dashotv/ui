import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { DownloadFile, Download as DownloadType, Medium, Release } from 'client/tower';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

import { ButtonMapButton } from 'components/Common';
import { MediaTo } from 'components/Media';
import { Nzbgeek as NzbgeekType } from 'components/Nzbgeek';
import { FilesWithSelector, MediumTabs, Nzbgeek, Torch } from 'components/Tabs';
import { Runic } from 'components/Tabs/Runic';
import { useDownloadingId } from 'hooks/downloading';
import { useTorrentRemoveMutation } from 'query/releases';
import { Torrent } from 'types/torrents';

import { DownloadBanner, DownloadInfo } from '.';

export type DownloadProps = {
  id: string;
  download: DownloadType;
  torrent?: Torrent;
  type: string;
  files?: DownloadFile[];
  episodes?: Medium[];
  selectMedium: (eid: string | null, num: number) => void;
  selectRelease: (url: string) => void;
  changeSetting: (name: string, value: string | boolean) => void;
  changeInfo: (info: Partial<DownloadType>) => void;
};
export function Download({
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
  const { status, thash, release_id, url, multi, auto, force, medium } = download;
  const { cover, background, title, display, updated_at } = medium || {};
  const torrentRemove = useTorrentRemoveMutation();
  const { progress, eta, queue, torrent_state } = useDownloadingId(id);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const tabsMap = {
    Files: <FilesWithSelector files={files} torrent={torrent} episodes={episodes} updater={selectMedium} />,
    Torch: <Torch medium={medium} selector={selectRelease} selected={{ release_id, url }} />,
    Runic: <Runic medium={medium} selector={selectRelease} selected={{ release_id, url }} />,
    Nzbgeek: <Nzbgeek medium={medium} selector={selectRelease} selected={{ release_id, url }} />,
  };

  const remove = useCallback((status: string) => {
    console.log('clicked remove');
    changeSetting('status', status);
    if (!thash) {
      return;
    }
    torrentRemove.mutate(thash, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
        }
      },
    });
  }, []);

  const buttons: ButtonMapButton[] = [
    {
      Icon: ArrowCircleLeftIcon,
      color: 'primary',
      click: () =>
        medium && medium.id && medium.type ? navigate(MediaTo(medium.id, medium.type, medium.series_id)) : undefined,
      title: 'Go to Media',
    },
    {
      Icon: CheckCircleIcon,
      color: 'primary',
      click: () => remove('done'),
      title: 'mark complete',
    },
    {
      Icon: OfflineBoltIcon,
      color: auto ? 'secondary' : 'action',
      click: () => changeSetting('auto', !auto),
      title: 'toggle auto',
    },
    {
      Icon: PlaylistAddCheckCircleIcon,
      color: multi ? 'secondary' : 'action',
      click: () => changeSetting('multi', !multi),
      title: 'toggle multi',
    },
    {
      Icon: SwapHorizontalCircleIcon,
      color: force ? 'secondary' : 'action',
      click: () => changeSetting('force', !force),
      title: 'toggle force',
    },
    {
      Icon: CancelIcon,
      color: 'error',
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
        torrentState={torrent_state}
        progress={progress}
        queue={queue}
        eta={eta?.toString()}
        buttons={buttons}
        updated_at={updated_at}
      />
      <DownloadInfo {...{ open, setOpen, status, thash, release_id, url }} changer={changeInfo} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
