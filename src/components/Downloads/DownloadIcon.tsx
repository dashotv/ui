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
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import IconButton from '@mui/material/IconButton';

import { DownloadStatus } from 'types/download';

export const DownloadIcon = ({ status }: { status: DownloadStatus }) => {
  const icon = () => {
    switch (status) {
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
      case 'paused':
        return PauseCircleIcon;
      case 'deleted':
        return RemoveCircleIcon;
      case 'held':
        return PendingIcon;
      default:
        return ReportProblemIcon;
    }
  };

  return React.createElement(icon(), { fontSize: 'small' });
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
