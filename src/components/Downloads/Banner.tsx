import React from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { ButtonMapButton, Chrono } from '@dashotv/components';

import { Banner } from 'components/Common';
import { DownloadIconButton, DownloadStatus } from 'components/Downloads';

export type DownloadBannerProps = {
  id?: string;
  title?: string;
  extra?: string;
  subtitle?: string;
  cover?: string;
  background?: string;
  status?: DownloadStatus;
  statusAction?: () => void;
  torrentState?: string;
  progress?: string | number;
  eta?: string;
  queue?: string | number;
  buttons?: ButtonMapButton[];
  unwatched?: number;
  progressBar?: boolean;
  multi?: boolean;
  files?: number;
  total?: number;
  updated_at?: string;
};
export const DownloadBanner = ({
  id,
  title,
  extra,
  subtitle,
  cover,
  background,
  buttons,
  status,
  statusAction,
  torrentState,
  progress,
  eta,
  queue,
  unwatched,
  progressBar = true,
  multi,
  files,
  total,
  updated_at,
}: DownloadBannerProps) => {
  const Queue = ({ queue }: { queue: string | number | undefined }) => {
    if (!queue) {
      return null;
    }
    return <Chip label={queue} size="small" />;
  };
  const Status = ({ status, action }: { status?: DownloadStatus; action?: () => void }) => {
    if (!status) {
      return null;
    }
    return <DownloadIconButton {...{ status, action }} />;
  };
  const Progress = ({ progress }: { progress?: string | number }) => {
    if (!progress) {
      return null;
    }
    return <span>{Number(progress).toFixed(1)}%</span>;
  };
  const Eta = ({ eta }: { eta?: string }) => {
    if (!eta) {
      return null;
    }
    return <Chrono fromNow>{eta}</Chrono>;
  };
  function tertiary() {
    return (
      <Stack spacing={1} direction="row" alignItems="center">
        <Queue {...{ queue }} />
        <Status {...{ status, action: statusAction }} />
        <Progress {...{ progress }} />
        <Eta {...{ eta }} />
      </Stack>
    );
  }

  const images: () => string[] = () => {
    const updated = updated_at ? Date.parse(updated_at).valueOf() / 1000 : Date.now() / 1000;
    const out: string[] = [];
    if (background) {
      out.push(background + '?updated=' + updated);
    }
    if (cover) {
      out.push(cover + '?updated=' + updated);
    }
    return out;
  };

  if (!id) {
    return null;
  }
  return (
    <Banner
      id={id}
      images={images()}
      title={title || 'unknown'}
      subtitle={subtitle}
      extra={extra}
      tertiary={tertiary()}
      buttons={buttons}
      unwatched={unwatched}
      adornments={<DownloadAdornments {...{ progressBar, progress, multi, files, total, torrentState }} />}
    />
  );
};
export interface DownloadAdornmentProps {
  progressBar?: boolean;
  progress?: string | number;
  multi?: boolean;
  files?: number;
  total?: number;
  torrentState?: string;
}
const DownloadAdornments = ({ progressBar, progress, multi, files, total, torrentState }: DownloadAdornmentProps) => {
  return (
    <>
      <DownloadState {...{ torrentState }} />
      <DownloadProgressBar enabled={progressBar} {...{ progress, multi, files, total }} />
    </>
  );
};

const DownloadState = ({ torrentState }: { torrentState?: string }) => {
  if (!torrentState) {
    return null;
  }
  switch (torrentState) {
    case 'error':
      return (
        <div className="state" style={{ backgroundColor: 'red' }}>
          <ErrorIcon fontSize="large" sx={{ color: 'black' }} />
        </div>
      );
    case 'checkingDL':
    case 'checkingUP':
    case 'checkingResumeData':
      return (
        <div className="state" style={{ backgroundColor: 'orange' }}>
          <WarningIcon fontSize="large" sx={{ color: 'black' }} />
        </div>
      );
    case 'pausedDL':
    case 'pausedUP':
      return (
        <div className="state" style={{ backgroundColor: 'grey' }}>
          <PauseCircleIcon fontSize="large" sx={{ color: 'black' }} />
        </div>
      );
    default:
      return <div className="state"></div>;
  }
};

const DownloadProgressBar = ({
  enabled,
  progress,
  multi,
  files,
  total,
}: {
  enabled?: boolean;
  progress?: string | number;
  multi?: boolean;
  files?: number;
  total?: number;
}) => {
  if (!enabled || !progress) {
    return null;
  }
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const disabled = theme.palette.grey[700];
  const multibar = () => {
    if (!multi || !files || !total || total > 48) {
      return;
    }
    const rows: React.ReactElement[] = [];
    for (let i = 0; i < total; i++) {
      rows.push(<div key={i} className="file" style={{ backgroundColor: i < files ? primary : disabled }}></div>);
    }
    return (
      <Stack sx={{ width: '100%' }} direction="row" spacing="2px" className="multibar">
        {rows}
      </Stack>
    );
  };
  return (
    <>
      {multibar()}
      <div className="progressbar">
        <div className="progress" style={{ width: `${progress}%`, backgroundColor: secondary }}></div>
      </div>
    </>
  );
};
