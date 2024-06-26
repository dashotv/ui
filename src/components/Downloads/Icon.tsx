import React from 'react';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ErrorIcon from '@mui/icons-material/Error';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import IconButton from '@mui/material/IconButton';

import { DownloadStatus } from './types';

export const DownloadGetIcon = (status?: DownloadStatus) => {
  switch (status) {
    // Torrent state
    case 'checking':
      return WarningIcon;
    case 'paused':
      return PauseCircleIcon;
    case 'error':
      return ErrorIcon;
    // Download status
    case 'searching':
      return SearchIcon;
    case 'loading':
      return YoutubeSearchedForIcon;
    case 'managing':
      return ManageSearchIcon;
    case 'reviewing':
      return ErrorIcon;
    case 'downloading':
      return CloudDownloadIcon;
    case 'done':
      return DownloadDoneIcon;
    case 'deleted':
      return RemoveCircleIcon;
    case 'held':
      return PendingIcon;
    default:
      return ReportProblemIcon;
  }
};

export const DownloadIcon = ({ status }: { status?: DownloadStatus }) => {
  return React.createElement(DownloadGetIcon(status), { fontSize: 'small' });
};

export const DownloadIconButton = ({ status, action }: { status: DownloadStatus; action?: () => void }) => {
  if (!action) {
    return <DownloadIcon status={status} />;
  }
  return (
    <IconButton onClick={action}>
      <DownloadIcon status={status} />
    </IconButton>
  );
};
