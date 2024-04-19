import React from 'react';

import { Download } from 'client/tower';

import { ButtonMapButton } from '@dashotv/components';

import { MediaCard } from 'components/Common';
import { useDownloadingId } from 'hooks/downloading';

export const DownloadCard = ({
  id,
  download,
  buttons,
}: {
  id: string;
  download: Download;
  buttons?: ButtonMapButton[];
}) => {
  const { progress, queue, files, eta } = useDownloadingId(id);
  const { selected, completed } = files || {};
  const { title, display, background, status } = download || {};
  return (
    <MediaCard
      id={id}
      type="download"
      title={title || 'unknown'}
      subtitle={display}
      image={background}
      progress={progress}
      files={selected}
      buttons={buttons}
      completed={completed}
      queue={queue}
      status={status}
      eta={eta}
    />
  );
};
