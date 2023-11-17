import React from 'react';

import { ButtonMapButton } from 'components/ButtonMap';
import Chrono from 'components/Chrono';
import { Medium } from 'types/medium';

import { Banner } from './Banner';

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
  },
}: MediumBannerProps) {
  const large = variant === 'large';

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
      title={type == 'Episode' ? title : display || title}
      subtitle={type == 'Episode' ? display : `${source}:${source_id}`}
      tertiary={release_date && <Chrono special>{release_date.toString()}</Chrono>}
      images={images()}
      flags={!large ? { active, broken, completed, favorite } : undefined}
      buttons={large ? buttons : undefined}
      unwatched={unwatched}
    />
  );
}