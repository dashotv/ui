import React from 'react';

import { Typography } from '@mui/material';

import { ButtonMapButton, Chrono } from 'components/Common';

import { Banner } from '../Common/Banner';
import { Medium } from './types';

export type MediumBannerProps = {
  id: string;
  variant?: 'small' | 'large' | undefined;
  buttons?: ButtonMapButton[];
  medium: Medium;
};

export function MediumBanner({
  id,
  variant,
  buttons,
  medium: {
    type,
    kind,
    title,
    source,
    source_id,
    display,
    release_date,
    // description,
    cover,
    background,
    active,
    broken,
    completed,
    favorite,
    unwatched,
    updated_at,
  },
}: MediumBannerProps) {
  const large = variant === 'large';

  const images: () => string[] = () => {
    const updated = Date.parse(updated_at).valueOf() / 1000;
    const out: string[] = [];
    if (background) {
      out.push(background + '?updated=' + updated);
    }
    if (cover) {
      out.push(cover + '?updated=' + updated);
    }
    return out;
  };

  const subtitle = () => {
    if (type == 'Episode') {
      return display;
    }
    return (
      <>
        <Typography variant="caption" fontWeight="bolder" mr={1}>
          {kind}
        </Typography>
        <Typography variant="caption" fontWeight="bolder">
          {source}:
        </Typography>
        <Typography variant="caption">{source_id}</Typography>
      </>
    );
  };

  return (
    <Banner
      id={id}
      title={type == 'Episode' ? title : display || title}
      subtitle={subtitle()}
      tertiary={release_date && <Chrono special>{release_date.toString()}</Chrono>}
      images={images()}
      flags={!large ? { active, broken, completed, favorite } : undefined}
      buttons={large ? buttons : undefined}
      unwatched={unwatched}
    />
  );
}
