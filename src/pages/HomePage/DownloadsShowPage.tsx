import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import { Download } from 'client/tower';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

import { ButtonMapButton } from '@dashotv/components';
import { LoadingIndicator } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import {
  DownloadBanner,
  DownloadInfo,
  useDownloadMediumQuery,
  useDownloadMutation,
  useDownloadQuery,
  useDownloadSelectionMutation,
} from 'components/Downloads';
import { MediaTo } from 'components/Media';
import { FilesWithSelector, MediumTabs, Nzbgeek, Torch } from 'components/Tabs';
import { Runic } from 'components/Tabs/Runic';
import { useSub } from 'hooks/sub';
import { EventDownload, EventDownloading } from 'types/events';

export default function DownloadsShowPage() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  if (!id) {
    throw new Error('id is required');
  }

  const { isFetching: downloadFetching, data: download } = useDownloadQuery(id);
  const { isFetching: mediaFetching, data: media } = useDownloadMediumQuery(id);
  const downloadUpdate = useDownloadMutation(id);
  const downloadSelection = useDownloadSelectionMutation(id);

  const updateDownload = useCallback(
    (data: Download) => {
      if (!data) {
        return;
      }
      queryClient.setQueryData(['downloads', id], data);
    },
    [queryClient],
  );

  const eventDownloading = useCallback(
    (event: EventDownloading) => {
      const d = event.downloads.filter(d => d.id === id);
      if (d.length > 0) {
        updateDownload(d[0]);
      }
    },
    [id, updateDownload],
  );

  const eventDownload = useCallback(
    (event: EventDownload) => {
      if (event.id === id) {
        updateDownload(event.download);
      }
    },
    [id, updateDownload],
  );

  useSub('tower.downloading', eventDownloading);
  useSub('tower.download', eventDownload);

  const {
    status,
    thash,
    url,
    multi,
    auto,
    force,
    medium,
    cover,
    background,
    title,
    display,
    search,
    files,
    torrent,
    torrent_state,
    queue,
    progress,
    eta,
  } = download || {};
  const { updated_at } = medium || {};

  const changeInfo = useCallback(
    info => {
      if (!download) {
        return;
      }
      downloadUpdate.mutate({ ...download, ...info });
    },
    [downloadUpdate],
  );

  const remove = useCallback((status: string) => {
    console.log('clicked remove');
    changeSetting('status', status);
  }, []);

  const changeSetting = useCallback(
    (setting: string, value: boolean | string) => {
      console.log('setting', setting, value, download);
      if (!download) {
        return;
      }
      if (setting === 'status' && value === 'searching') {
        downloadUpdate.mutate({ ...download, status: 'searching', release_id: '', url: '' });
        return;
      }
      downloadUpdate.mutate({ ...download, [setting]: value });
    },
    [downloadUpdate],
  );

  const selectRelease = useCallback(
    (url: string) => {
      if (!download) {
        return;
      }
      downloadUpdate.mutate({ ...download, status: 'loading', url: url });
    },
    [downloadUpdate],
  );

  const selectMedium = useCallback(
    (eid: string | null, num: number) => {
      downloadSelection.mutate({ mediumId: eid || '', num: num });
    },
    [downloadSelection],
  );

  const tabsMap = {
    Files: <FilesWithSelector files={files} torrent={torrent} episodes={media} updater={selectMedium} />,
    Torch: <Torch search={search} selector={selectRelease} selected={url} />,
    Runic: <Runic search={search} selector={selectRelease} selected={url} />,
    Nzbgeek: <Nzbgeek search={search} selector={selectRelease} selected={url} />,
  };

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
    <>
      <Helmet>
        <title>Download{display ? ` - ${display}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      {(downloadFetching || mediaFetching) && <LoadingIndicator />}
      {download && (
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
          <DownloadInfo {...{ open, setOpen, status, thash, url }} changer={changeInfo} />
          <MediumTabs data={tabsMap} />
        </div>
      )}
    </>
  );
}
