import React from 'react';
import { useImage } from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import StarsIcon from '@mui/icons-material/Stars';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { ButtonMap, ButtonMapButton } from '@dashotv/components';

import './Banner.scss';
import { MenuMap, MenuMapItem } from './Menu';

// TODO: generalize this?
function Unwatched({ count }: { count?: number }) {
  if (count === undefined || count === 0) {
    return <></>;
  }
  return (
    <Stack direction="row" spacing={1} sx={{ height: '34px' }} alignItems="center">
      <Chip label={count > 9 ? '9+' : count} variant="filled" size="small" color="secondary" />
    </Stack>
  );
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
  menu?: MenuMapItem[];
};
export function BannerActions({ unwatched, buttons, flags, menu }: BannerActionsProps) {
  const { active, broken, favorite, completed } = flags || {};
  return (
    <Stack spacing={'2px'} direction="row">
      {buttons && <ButtonMap size="medium" buttons={buttons} />}
      {flags && <BannerIcons {...{ active, broken, favorite, completed }} />}
      {menu && <MenuMap size="medium" items={menu} />}
      <Unwatched count={unwatched} />
    </Stack>
  );
}

const BannerImage = ({ images }: { images?: string[] }) => {
  const list = (images ? images : []).concat('/blank.png');
  const { src } = useImage({ srcList: list, useSuspense: false });
  return <img src={src} />;
};

export type BannerProps = {
  id: string;
  title: string;
  extra?: string;
  subtitle?: React.ReactNode;
  tertiary?: React.ReactNode;
  images?: string[];
  buttons?: ButtonMapButton[];
  menu?: MenuMapItem[];
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
  menu,
  flags,
  unwatched,
  adornments,
}: BannerProps) {
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
            <BannerActions {...{ buttons, flags, unwatched, menu }} />
          </div>
          {adornments && <div className="adornments">{adornments}</div>}
        </div>
        <div className="banner-dimmer"></div>
        <div className="banner-background">
          <VisibilitySensor partialVisibility={true} offset={{ bottom: 100 }}>
            <BannerImage images={images} />
          </VisibilitySensor>
        </div>
      </div>
    </Paper>
  );
}
