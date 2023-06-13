import * as React from 'react';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ErrorIcon from '@mui/icons-material/Error';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

import MediumSmall from '../MediumSmall';

export default function Downloads(props) {
  function progress(thash) {
    if (props.torrents != null) {
      const torrent = props.torrents.get(thash);
      if (torrent) {
        return torrent.Progress;
      }
    }

    if (props.nzbs != null) {
      const nzb = props.nzbs.get(Number(thash));
      if (nzb) {
        return 100.0 - (nzb.RemainingSizeMB / nzb.FileSizeMB) * 100;
      }
    }

    return 0;
  }

  function eta(thash) {
    if (props.torrents != null) {
      const torrent = props.torrents.get(thash);
      if (torrent) {
        if (torrent.Finish > 0) return new Date(Date.now() + torrent.Finish * 1000);
      }
    }

    if (props.nzbs != null) {
      const nzb = props.nzbs.get(Number(thash));
      if (nzb) {
        if (props.nzbStatus.DownloadRate > 0) {
          const secs = (nzb.RemainingSizeMB * 1024) / (props.nzbStatus.DownloadRate / 1024);
          return new Date(Date.now() + secs * 1000);
        }
      }
    }

    return null;
  }

  function queue(thash) {
    if (props.torrents != null) {
      const torrent = props.torrents.get(thash);
      if (torrent) {
        return torrent.Queue;
      }
    }

    if (props.nzbs != null) {
      const nzb = props.nzbs.get(Number(thash));
      if (nzb) {
        return nzb.nzbid;
      }
    }

    return null;
  }

  function icon(status) {
    switch (status) {
      case 'searching':
        return <SearchIcon fontSize="small" />;
      case 'loading':
        return <YoutubeSearchedForIcon fontSize="small" />;
      case 'managing':
        return <ManageSearchIcon fontSize="small" />;
      case 'reviewing':
        return <ErrorIcon fontSize="small" />;
      case 'downloading':
        return <CloudDownloadIcon fontSize="small" />;
      case 'done':
        return <DownloadDoneIcon fontSize="small" />;
      case 'paused':
        return <PauseCircleIcon fontSize="small" />;
      case 'deleted':
        return <RemoveCircleIcon fontSize="small" />;
      case 'held':
        return <PendingIcon fontSize="small" />;
    }
  }

  return (
    <div>
      {props.data.map(({ id, thash, status, medium }) => (
        <MediumSmall
          key={id}
          type="downloads"
          id={id}
          active={medium.active}
          background={medium.cover}
          primary={medium.title}
          secondary={medium.display}
          release={medium.release_date}
          progress={progress(thash)}
          eta={eta(thash)}
          queue={queue(thash)}
          download={true}
          downloadIcon={icon(status)}
          unwatched={medium.unwatched}
        />
      ))}
    </div>
  );
}
