import React from 'react';

import { Download } from 'client/tower';
import { clickHandler } from 'utils/handler';

import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { ButtonMapButton } from '@dashotv/components';

import { CoverRow } from 'components/Common';
import { useDownloadMutation } from 'components/Downloads/query';

export const CoverRowDownload = ({ download }: { download: Download }) => {
  const { id, url, progress, queue, files_selected, files_completed, title, display, kind, cover, background } =
    download || {};
  if (!id) throw new Error('id is required');

  const updater = useDownloadMutation(id);
  const downloadStatus = (id: string, status: string) => {
    updater.mutate({ ...download, status: status });
  };
  const buttons: ButtonMapButton[] = [
    {
      Icon: ChangeCircleIcon,
      color: url !== '' ? 'warning' : 'disabled',
      click: clickHandler(() => (url !== '' ? downloadStatus(id, 'loading') : null)),
      title: 'Reloading',
    },
    {
      Icon: ErrorIcon,
      color: 'warning',
      click: clickHandler(() => downloadStatus(id, 'reviewing')),
      title: 'Reviewing',
    },
    {
      Icon: CheckCircleIcon,
      color: 'primary',
      click: clickHandler(() => downloadStatus(id, 'done')),
      title: 'Done',
    },
    {
      Icon: CancelIcon,
      color: 'error',
      click: clickHandler(() => downloadStatus(id, 'deleted')),
      title: 'Delete',
    },
  ];

  return (
    <CoverRow
      title={title || 'unknown'}
      subtitle={display}
      kind={kind || 'unknown'}
      image={background || cover}
      progress={Number(progress)}
      count={queue}
      files={files_selected}
      completed={files_completed}
      buttons={buttons}
    />
  );
};
