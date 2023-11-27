import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

import { ButtonMapButton } from 'components/Common';
import { DownloadInfo } from 'components/Downloads';
import { MediaTo, Medium } from 'components/Media';
import { Nzbgeek as NzbgeekType } from 'components/Nzbgeek';
import { Release } from 'components/Releases';
import { FilesWithSelector, MediumTabs, Nzbgeek, Torch } from 'components/Tabs';
import { useReleases } from 'hooks/useReleases';
import { useTorrentRemoveMutation } from 'query/releases';
import { Torrent } from 'types/torrents';

import { DownloadBanner, DownloadFile, DownloadType } from '.';

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
  const {
    status,
    thash,
    release_id,
    url,
    multi,
    auto,
    force,
    medium,
    medium: { cover, background, title, display },
  } = download;
  const torrentRemove = useTorrentRemoveMutation();
  const { progress, eta, queue, torrentState } = useReleases();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const tabsMap = {
    Files: <FilesWithSelector files={files} torrent={torrent} episodes={episodes} updater={selectMedium} />,
    Torch: <Torch medium={medium} selector={selectRelease} selected={{ release_id, url }} />,
    Nzbgeek: <Nzbgeek medium={medium} selector={selectRelease} selected={{ release_id, url }} />,
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

  const buttons: ButtonMapButton[] = [
    {
      Icon: ArrowCircleLeftIcon,
      color: 'primary',
      click: () => navigate(MediaTo(medium.id, medium.type, medium.series_id)),
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
        torrentState={torrentState(thash)}
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
