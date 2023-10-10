import * as React from 'react';
import Moment from 'react-moment';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import ButtonMap from 'components/ButtonMap';

import './banner.scss';

function Unwatched({ count }: { count?: number }) {
  if (count === undefined || count === 0) {
    return <></>;
  }
  return <Chip label={count > 9 ? '9+' : count} variant="filled" size="small" />;
}

type IconsProps = { active?: boolean; unwatched?: number; completed?: boolean };
function Icons({ unwatched }: IconsProps) {
  return (
    <div className="icons">
      {/* {active && <StarIcon fontSize="small" />} */}
      {/* {completed && <CheckCircleIcon fontSize="small" />} */}
      <Unwatched count={unwatched} />
    </div>
  );
}

type ActionsProps = {
  active?: boolean;
  unwatched?: number;
  completed?: boolean;
  buttons?: any[];
};
function Actions({ unwatched, buttons }: ActionsProps) {
  return (
    <div>
      <Icons unwatched={unwatched} />
      <ButtonMap size="small" buttons={buttons} />
    </div>
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
  unwatched,
  completed,
  buttons,
}: BannerProps) {
  return (
    <div className="banner-container">
      <div className="banner">
        <div className="titlebar">
          <div className="title">
            <span>{title}</span>
            {!tertiary && (
              <Moment format="YYYY-MM-DD" add={{ days: 1 }}>
                {release_date}
              </Moment>
            )}
          </div>
          {subtitle && (
            <div className="subtitle">
              <span>{subtitle}</span>
            </div>
          )}
          <div className="download">
            <Stack spacing={1} direction="row">
              {tertiary}
            </Stack>
          </div>
          <div className="actions">
            <Actions {...{ active, unwatched, completed, buttons }} />
          </div>
        </div>
      </div>
      <div className="banner-dimmer"></div>
      <div className="banner-background">{background && <img alt="background" src={background} />}</div>
    </div>
  );
}
