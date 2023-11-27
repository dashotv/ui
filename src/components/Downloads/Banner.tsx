import React from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useTheme } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { Banner, ButtonMapButton, Chrono } from 'components/Common';
import { DownloadIconButton, DownloadStatus } from 'components/Downloads';

export type DownloadBannerProps = {
  id: string;
  title: string;
  extra?: string;
  subtitle?: string;
  cover?: string;
  background?: string;
  status?: DownloadStatus;
  statusAction?: () => void;
  torrentState?: string;
  progress?: string;
  eta?: string;
  queue?: string;
  buttons?: ButtonMapButton[];
  unwatched?: number;
  progressBar?: boolean;
  multi?: boolean;
  files?: number;
  total?: number;
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
}: DownloadBannerProps) => {
  function tertiary() {
    return (
      <Stack spacing={1} direction="row" alignItems="center">
        {queue && <Chip label={queue} size="small" />}
        {status && <DownloadIconButton status={status} action={statusAction} />}
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
      adornments={<DownloadAdornments {...{ progressBar, progress, multi, files, total, torrentState }} />}
    />
  );
};
export interface DownloadAdornmentProps {
  progressBar?: boolean;
  progress?: string;
  multi?: boolean;
  files?: number;
  total?: number;
  torrentState?: string;
}
const DownloadAdornments = ({ progressBar, progress, multi, files, total, torrentState }: DownloadAdornmentProps) => {
  return (
    <div className="adornments">
      {torrentState && <DownloadState {...{ torrentState }} />}
      {progressBar && progress && <DownloadProgressBar {...{ progress, multi, files, total }} />}
    </div>
  );
};

const DownloadState = ({ torrentState }: { torrentState: string }) => {
  switch (torrentState) {
    case 'error':
      return (
        <div className="state" style={{ backgroundColor: 'red' }}>
          <ErrorIcon fontSize="large" />
        </div>
      );
    case 'pausedDL':
      return (
        <div className="state" style={{ backgroundColor: 'grey' }}>
          <PauseCircleIcon fontSize="large" />
        </div>
      );
    default:
      <div className="state"></div>;
  }
};

const DownloadProgressBar = ({
  progress,
  multi,
  files,
  total,
}: {
  progress: string;
  multi?: boolean;
  files?: number;
  total?: number;
}) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const disabled = theme.palette.grey[700];
  const multibar = () => {
    if (!multi || !files || !total || total > 26) {
      return;
    }
    const rows: React.ReactElement[] = [];
    for (let i = 0; i < total; i++) {
      rows.push(<div className="file" style={{ backgroundColor: i < files ? primary : disabled }}></div>);
    }
    return (
      <Stack sx={{ width: '100%' }} direction="row" spacing="3px" className="multibar">
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
