import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import { Download, Medium } from 'client/tower';

import { LoadingIndicator } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { DownloadBanner, useDownloadMutation, useDownloadQuery } from 'components/Downloads';
import { MediaTo } from 'components/Media';
import { useSub } from 'hooks/sub';
import { EventDownload, EventDownloading } from 'types/events';

import { DownloadTabs } from './Tabs';

export const DownloadsShow = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('id is required');
  }

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const downloadUpdate = useDownloadMutation(id);

  const { isFetching: downloadFetching, data: download } = useDownloadQuery(id);
  const { title, display } = download || {};

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

  const nav = (medium?: Medium) => {
    if (medium && medium.id && medium.type) {
      navigate(MediaTo(medium.id, medium.type, medium.series_id));
    }
  };

  const changeSetting = useCallback(
    (setting: string, value: boolean | string) => {
      // console.log('setting', setting, value, download);
      if (!download) {
        return;
      }
      downloadUpdate.mutate(
        { ...download, [setting]: value },
        {
          onSuccess: () => {
            queryClient.setQueryData(['downloads', id], (prev: Download) => {
              return { ...prev, [setting]: value };
            });
          },
        },
      );
    },
    [downloadUpdate, download],
  );

  return (
    <>
      <Helmet>
        <title>Download{display ? ` - ${display}` : title ? `- ${title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      {downloadFetching && <LoadingIndicator />}
      {download && (
        <div className="medium large">
          <DownloadBanner {...{ id, download, changeSetting, nav }} />
          <DownloadTabs {...{ id, download }} />
        </div>
      )}
    </>
  );
};
