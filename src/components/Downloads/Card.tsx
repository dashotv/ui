import React from 'react';

import { Download } from 'client/tower';
import { clickHandler } from 'utils/handler';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ButtonMapButton } from '@dashotv/components';

import { MediaCard } from 'components/Common';
import { useDownloadingId } from 'hooks/downloading';

import { useDownloadMutation } from './query';

export const DownloadCard = ({ id, download }: { id: string; download: Download }) => {
  const { progress, queue, files, eta } = useDownloadingId(id);
  const { selected, completed } = files || {};
  const { title, display, background, cover, status } = download || {};
  const { release_date } = download?.medium || {};

  const updater = useDownloadMutation(id);

  const downloadDone = (id: string) => {
    console.log('download done', id);
    updater.mutate({ ...download, status: 'done' });
  };
  const downloadDelete = (id: string) => {
    console.log('download delete', id);
    updater.mutate({ ...download, status: 'deleted' });
  };

  const buttons: ButtonMapButton[] = [
    {
      Icon: CheckCircleIcon,
      color: 'primary',
      click: clickHandler(() => downloadDone(id)),
      title: 'Done',
    },
    {
      Icon: CancelIcon,
      color: 'error',
      click: clickHandler(() => downloadDelete(id)),
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
      progress={progress}
      files={selected}
      buttons={buttons}
      completed={completed}
      queue={queue}
      status={status}
      release_date={release_date}
      eta={eta}
    />
  );
};
