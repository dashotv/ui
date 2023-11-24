import * as React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import StarsIcon from '@mui/icons-material/Stars';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { ButtonMap, ButtonMapButton } from '.';
import './Banner.scss';

// TODO: generalize this?
function Unwatched({ count }: { count?: number }) {
  if (count === undefined || count === 0) {
    return <></>;
  }
  return <Chip label={count > 9 ? '9+' : count} variant="filled" size="small" color="secondary" />;
}

export type BannerIconsProps = {
  active?: boolean;
  broken?: boolean;
  completed?: boolean;
  favorite?: boolean;
};
export function BannerIcons({ active, broken, completed, favorite }: BannerIconsProps) {
  return (
    <Stack spacing={'2px'} direction="row">
      {active && <StarsIcon fontSize="medium" color="action" />}
      {broken && <BuildCircleIcon fontSize="medium" color="action" />}
      {completed && <CheckCircleIcon fontSize="medium" color="action" />}
      {favorite && <RecommendIcon fontSize="medium" color="action" />}
    </Stack>
  );
}

export type BannerActionsProps = {
  unwatched?: number;
  flags?: BannerIconsProps;
  buttons?: ButtonMapButton[];
};
export function BannerActions({ unwatched, buttons, flags }: BannerActionsProps) {
  const { active, broken, favorite, completed } = flags || {};
  return (
    <Stack spacing={'2px'} direction="row">
      <ButtonMap size="small" buttons={buttons} />
      {flags && <BannerIcons {...{ active, broken, favorite, completed }} />}
      <Unwatched count={unwatched} />
    </Stack>
  );
}

export type BannerProps = {
  id: string;
  title: string;
  extra?: string;
  subtitle?: string;
  tertiary?: React.ReactNode;
  images?: string[];
  buttons?: ButtonMapButton[];
  flags?: BannerIconsProps;
  unwatched?: number;
  adornments?: React.ReactNode;
};
export function Banner({
  title,
  extra,
  subtitle,
  tertiary,
  images,
  buttons,
  flags,
  unwatched,
  adornments,
}: BannerProps) {
  const background = () => {
    return images
      ?.concat('/blank.png')
      .map(i => {
        return `url(${i})`;
      })
      .join(', ');
  };
  return (
    <Paper elevation={5}>
      <div className="banner-container">
        <div className="banner">
          <div className="titlebar">
            <div className="title">
              <span>{title}</span>
              {extra && <span className="extra">{extra}</span>}
            </div>
            <div className="subtitle">{subtitle && <span>{subtitle}</span>}</div>
          </div>
          <div className="download">{tertiary}</div>
          <div className="actions">
            <BannerActions {...{ buttons, flags, unwatched }} />
          </div>
          {adornments && <div className="adornments">{adornments}</div>}
        </div>
        <div className="banner-dimmer"></div>
        <div
          className="banner-background"
          style={{
            backgroundImage: background(),
          }}
        />
      </div>
    </Paper>
  );
}
