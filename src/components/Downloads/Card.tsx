import React from 'react';

import { Download } from 'client/tower';
import { clickHandler } from 'utils/handler';

import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Stack, Typography } from '@mui/material';

import { ButtonMapButton } from '@dashotv/components';

import { MediaCard } from 'components/Common';

import { useDownloadMutation } from './query';

const combinedStatus = (status?: string, torrentState?: string) => {
  if (!torrentState) {
    return status;
  }
  switch (torrentState) {
    case 'error':
      return 'error';
    case 'checkingDL':
    case 'checkingUP':
    case 'checkingResumeData':
      return 'checking';
    case 'pausedDL':
    case 'pausedUP':
      return 'paused';
    default:
      return status;
  }
};

export const DownloadCard = ({ id, download }: { id: string; download: Download }) => {
  const {
    title,
    display,
    background,
    cover,
    status,
    eta,
    progress,
    queue,
    auto,
    multi,
    force,
    tag,
    files_selected,
    files_completed,
    files_wanted,
  } = download || {};
  const { release_date } = download?.medium || {};

  const updater = useDownloadMutation(id);

  const downloadStatus = (id: string, status: string) => {
    updater.mutate({ ...download, status: status });
  };

  const buttons: ButtonMapButton[] = [
    {
      Icon: ChangeCircleIcon,
      color: 'warning',
      click: clickHandler(() => downloadStatus(id, 'loading')),
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
    <MediaCard
      id={id}
      type="download"
      title={title || 'unknown'}
      subtitle={display}
      image={background || cover || '/blank.png'}
      icons={{ auto, multi, force }}
      buttons={buttons}
      progress={progress}
      filesSelected={files_selected}
      filesCompleted={files_completed}
      filesWanted={files_wanted}
      queue={queue}
      status={combinedStatus(status, download.torrent?.State)}
      release_date={release_date}
      eta={eta}
      extra={
        <DownloadExtra
          files_selected={files_selected}
          files_completed={files_completed}
          files_wanted={files_wanted}
          tag={tag}
        />
      }
    />
  );
};

const DownloadExtra = ({
  files_selected,
  files_completed,
  files_wanted,
  tag,
}: {
  files_selected?: number;
  files_completed?: number;
  files_wanted?: number;
  tag?: string;
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body1" color="secondary.dark" fontWeight="bold">
        {files_wanted}
      </Typography>
      <Typography variant="body1" color="primary" fontWeight="bold">
        /
      </Typography>
      <Typography variant="body1" color="secondary" fontWeight="bold">
        {files_completed}
      </Typography>
      <Typography variant="body1" color="primary" fontWeight="bold">
        /
      </Typography>
      <Typography variant="body1" color="gray" fontWeight="bold">
        {files_selected}
      </Typography>
      <Typography variant="body1" color="disabled">
        {tag}
      </Typography>
    </Stack>
  );
};
