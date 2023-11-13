import React from 'react';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ErrorIcon from '@mui/icons-material/Error';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

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
    }
  };

  return (
    <div title={status} style={{ height: '24px' }}>
      {React.createElement(icon(), { fontSize: 'small' })}
    </div>
  );
};
