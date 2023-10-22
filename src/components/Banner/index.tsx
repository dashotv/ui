import * as React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RecommendIcon from '@mui/icons-material/Recommend';
import StarsIcon from '@mui/icons-material/Stars';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import ButtonMap from 'components/ButtonMap';
import Chrono from 'components/Chrono';

import './banner.scss';

function Unwatched({ count }: { count?: number }) {
  if (count === undefined || count === 0) {
    return <></>;
  }
  return <Chip label={count > 9 ? '9+' : count} variant="filled" size="small" />;
}

type IconsProps = {
  active?: boolean;
  completed?: boolean;
  favorite?: boolean;
  unwatched?: number;
};
function Icons({ unwatched, active, completed, favorite }: IconsProps) {
  return (
    <div className="icons">
      {active && <StarsIcon fontSize="small" />}
      {completed && <CheckCircleIcon fontSize="small" />}
      {favorite && <RecommendIcon fontSize="small" />}
      <Unwatched count={unwatched} />
    </div>
  );
}

type ActionsProps = {
  active?: boolean;
  completed?: boolean;
  favorite?: boolean;
  unwatched?: number;
  buttons?: any[];
};
function Actions({ unwatched, buttons, active, favorite, completed }: ActionsProps) {
  return (
    <Stack spacing={1} direction="row">
      <ButtonMap size="small" buttons={buttons} />
      <Icons {...{ active, favorite, completed, unwatched }} />
    </Stack>
  );
}

type BannerProps = {
  id: string;
  title: string;
  subtitle?: string;
  release_date?: string;
  background: string;
  cover?: string;
  tertiary?: React.ReactNode;
  downloadIcon?: React.ReactNode;
  queue?: number;
  progress?: number;
  eta?: Date | null;
  favorite?: boolean;
  broken?: boolean;
  active?: boolean;
  unwatched?: number;
  completed?: boolean;
  change?: any;
  buttons: any[];
};
export default function Banner({
  id,
  title,
  subtitle,
  release_date,
  background,
  tertiary,
  active,
  completed,
  favorite,
  unwatched,
  buttons,
}: BannerProps) {
  return (
    <Paper elevation={5}>
      <div className="banner-container">
        <div className="banner">
          <div className="titlebar">
            <div className="title">
              <span>{title}</span>
              {!tertiary && release_date !== undefined && <Chrono format="YYYY-MM-DD">{release_date}</Chrono>}
            </div>
            {subtitle && (
              <div className="subtitle">
                <span>{subtitle}</span>
              </div>
            )}
            <div className="download">{tertiary}</div>
            <div className="actions">
              <Actions {...{ unwatched, buttons, active, completed, favorite }} />
            </div>
          </div>
        </div>
        <div className="banner-dimmer"></div>
        <div className="banner-background">{background && <img alt="background" src={background} />}</div>
      </div>
    </Paper>
  );
}
