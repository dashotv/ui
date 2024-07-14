import React, { useCallback } from 'react';

import { Download } from 'client/tower';

import { LoadingIndicator, RoutingTabs, RoutingTabsRoute } from '@dashotv/components';

import {
  useDownloadClearMutation,
  useDownloadMediumQuery,
  useDownloadMutation,
  useDownloadSelectionMutation,
} from 'components/Downloads';
import { FilesWithSelector, Nzbgeek } from 'components/Tabs';
import { Runic } from 'components/Tabs/Runic';

export const DownloadTabs = ({ id, download }: { id: string; download: Download }) => {
  const { isFetching, data: media } = useDownloadMediumQuery(id);
  const { url, search, files, torrent } = download;
  const downloadUpdate = useDownloadMutation(id);
  const downloadSelection = useDownloadSelectionMutation(id);
  const downloadClear = useDownloadClearMutation(id);

  const selectRelease = useCallback(
    (url: string) => {
      if (!download) {
        return;
      }
      downloadUpdate.mutate({ ...download, status: 'loading', url: url });
    },
    [downloadUpdate, download],
  );

  const selectMedium = useCallback(
    (eid: string | null, num: number) => {
      downloadSelection.mutate({ mediumId: eid || '', num: num });
    },
    [downloadSelection],
  );

  const clearMedia = useCallback(
    (nums: number[]) => {
      downloadClear.mutate(nums);
    },
    [downloadClear],
  );

  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Files',
      to: '',
      element: (
        <FilesWithSelector
          files={files}
          torrent={torrent}
          episodes={media}
          updater={selectMedium}
          clearer={clearMedia}
        />
      ),
    },
    {
      label: 'Runic',
      to: 'search',
      element: <Runic search={search} selector={selectRelease} selected={url} />,
    },
    {
      label: 'Geek',
      to: 'geek',
      element: <Nzbgeek search={search} selector={selectRelease} selected={url} />,
    },
  ];

  return (
    <>
      {isFetching && <LoadingIndicator />}
      <RoutingTabs data={tabsMap} mount="/downloads/:id" />
    </>
  );
};
