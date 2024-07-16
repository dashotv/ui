import React, { useCallback, useState } from 'react';

import { Download, Medium } from 'client/tower';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { ButtonMapButton, Chrono } from '@dashotv/components';

import { Banner } from 'components/Common';

import { DownloadIconButton } from './Icon';
import { DownloadInfo, DownloadInfoValues } from './Info';
import { useDownloadMutation } from './query';
import { DownloadStatus } from './types';

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
  download,
  nav,
  changeSetting,
}: {
  id: string;
  download: Download;
  nav: (medium?: Medium) => void;
  changeSetting: (setting: string, value: boolean | string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const downloadUpdate = useDownloadMutation(id);
  const {
    title,
    display,
    cover,
    background,
    status,
    thash,
    progress,
    eta,
    queue,
    unwatched,
    multi,
    updated_at,
    medium,
    auto,
    force,
    tag,
    torrent_state,
    url,
    files_selected,
    files_completed,
  } = download || {};

  function tertiary() {
    return (
      <Stack spacing={1} direction="row" alignItems="center">
        <Queue {...{ queue }} />
        <Status {...{ status, action: openInfo }} />
        <Progress {...{ progress }} />
        <Eta {...{ eta }} />
      </Stack>
    );
  }

  const openInfo = () => {
    setOpen(true);
  };

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

  const changeInfo = useCallback(
    (info: DownloadInfoValues) => {
      if (!download) {
        return;
      }
      downloadUpdate.mutate({ ...download, ...info });
    },
    [downloadUpdate, download],
  );

  const remove = useCallback(
    (status: string) => {
      changeSetting('status', status);
    },
    [changeSetting],
  );

  const buttons: ButtonMapButton[] = [
    {
      Icon: ArrowCircleLeftIcon,
      color: download === undefined ? 'warning' : 'primary',
      click: () => nav(medium),
      title: 'Go to Media',
    },
    {
      Icon: CheckCircleIcon,
      color: 'primary',
      click: () => remove('done'),
      title: 'mark complete',
    },
    {
      Icon: OfflineBoltIcon,
      color: auto ? 'secondary' : 'action',
      click: () => changeSetting('auto', !auto),
      title: 'toggle auto',
    },
    {
      Icon: PlaylistAddCheckCircleIcon,
      color: multi ? 'secondary' : 'action',
      click: () => changeSetting('multi', !multi),
      title: 'toggle multi',
    },
    {
      Icon: SwapHorizontalCircleIcon,
      color: force ? 'secondary' : 'action',
      click: () => changeSetting('force', !force),
      title: 'toggle force',
    },
    {
      Icon: CancelIcon,
      color: 'error',
      click: () => remove('deleted'),
      title: 'delete',
    },
  ];
  return (
    <>
      <Banner
        id={id}
        images={images()}
        title={title || 'unknown'}
        subtitle={display}
        tertiary={tertiary()}
        buttons={buttons}
        unwatched={unwatched}
        adornments={
          <DownloadAdornments {...{ progress, multi, files: files_completed, total: files_selected, torrent_state }} />
        }
      />
      <DownloadInfo {...{ open, setOpen, status, url, tag, thash }} changer={changeInfo} />
    </>
  );
};

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

export interface DownloadAdornmentProps {
  progress?: string | number;
  multi?: boolean;
  files?: number;
  total?: number;
  torrentState?: string;
}
const DownloadAdornments = ({ progress, multi, files, total, torrentState }: DownloadAdornmentProps) => {
  return (
    <>
      <DownloadState {...{ torrentState }} />
      <DownloadProgressBar enabled={true} {...{ progress, multi, files, total }} />
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
      return null;
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
