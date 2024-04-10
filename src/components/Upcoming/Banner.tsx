import React from 'react';

import { Upcoming } from 'client/tower';

import { Typography } from '@mui/material';

import { ButtonMapButton, Chrono } from 'components/Common';

import { Banner } from '../Common/Banner';

export type UpcomingBannerProps = {
  id: string;
  variant?: 'small' | 'large' | undefined;
  buttons?: ButtonMapButton[];
  upcoming: Upcoming;
};

export function UpcomingBanner({
  id,
  variant,
  buttons,
  upcoming: {
    type,
    title,
    source_id,
    display,
    release_date,
    description,
    downloaded,
    completed,

    series_kind,
    series_source,
    series_cover,
    series_cover_updated,
    series_background,
    series_background_updated,
    series_active,
    series_favorite,
    series_unwatched,
  },
}: UpcomingBannerProps) {
  const large = variant === 'large';
  const images = processImages(series_background, series_background_updated, series_cover, series_cover_updated);

  // const subtitle = () => {
  //   if (type == 'Episode') {
  //     return display;
  //   }
  //   return (
  //     <>
  //       <Typography variant="caption" fontWeight="bolder" mr={1}>
  //         {series_kind}
  //       </Typography>
  //       <Typography variant="caption" fontWeight="bolder">
  //         {series_source}:
  //       </Typography>
  //       <Typography variant="caption">{source_id}</Typography>
  //     </>
  //   );
  // };

  return (
    <Banner
      id={id}
      title={title || 'Unknown'}
      subtitle={display}
      tertiary={release_date && <Chrono special>{release_date.toString()}</Chrono>}
      images={images}
      flags={!large ? { active: series_active, completed, favorite: series_favorite } : undefined}
      buttons={large ? buttons : undefined}
      unwatched={series_unwatched}
    />
  );
}

const processImages: (
  series_background?: string,
  series_background_updated?: string,
  series_cover?: string,
  series_cover_updated?: string,
) => string[] = (
  series_background?: string,
  series_background_updated?: string,
  series_cover?: string,
  series_cover_updated?: string,
) => {
  const out: string[] = [];
  if (series_background) {
    out.push(series_background + '?updated=' + series_background_updated);
  }
  if (series_cover) {
    out.push(series_cover + '?updated=' + series_cover_updated);
  }
  return out;
};
