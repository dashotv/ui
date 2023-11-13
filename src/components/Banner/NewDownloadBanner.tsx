import React from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { ButtonMapButton } from 'components/ButtonMap';
import Chrono from 'components/Chrono';
import { DownloadIcon } from 'components/Downloads';

import { Banner } from './Banner';

export type NewDownloadBannerProps = {
  id: string;
  title: string;
  extra?: string;
  subtitle?: string;
  cover?: string;
  background?: string;
  status?: string;
  progress?: string;
  eta?: string;
  queue?: string;
  buttons?: ButtonMapButton[];
  unwatched?: number;
};
export const NewDownloadBanner = ({
  id,
  title,
  extra,
  subtitle,
  cover,
  background,
  buttons,
  status,
  progress,
  eta,
  queue,
  unwatched,
}: NewDownloadBannerProps) => {
  function tertiary() {
    return (
      <Stack spacing={1} direction="row">
        {queue && <Chip label={queue} size="small" />}
        {status && <DownloadIcon status={status} />}
        {progress && <span>{Number(progress).toFixed(1)}%</span>}
        {eta && <Chrono fromNow>{eta}</Chrono>}
      </Stack>
    );
  }

  const images: () => string[] = () => {
    const out: string[] = [];
    if (background) {
      out.push(background);
    }
    if (cover) {
      out.push(cover);
    }
    return out;
  };

  return (
    <Banner
      id={id}
      images={images()}
      title={title}
      subtitle={subtitle}
      extra={extra}
      tertiary={tertiary()}
      buttons={buttons}
      unwatched={unwatched}
    />
  );
};
