import * as React from 'react';
import MediumSmall from '../MediumSmall';
import SearchIcon from '@mui/icons-material/Search';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ErrorIcon from '@mui/icons-material/Error';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PendingIcon from '@mui/icons-material/Pending';

export default function Downloads(props) {
  function type(t) {
    switch (t) {
      case 'Movie':
        return 'movies';
      default:
        return 'series';
    }
  }

  function getID(medium) {
    switch (medium.type) {
      case 'Episode':
        return medium.series_id;
      default:
        return medium.id;
    }
  }

  function progress(thash) {
    if (props.torrents != null) {
      const torrent = props.torrents.get(thash);
      if (torrent) {
        return torrent.Progress;
      }
    }

    if (props.nzbs != null) {
      const nzb = props.nzbs.get(thash);
      if (nzb) {
        return 100.0 - (nzb.RemainingSizeMB / nzb.FileSizeMB) * 100;
      }
    }

    return 0;
  }

  function icon(status) {
    switch (status) {
      case 'searching':
        return <SearchIcon />;
      case 'loading':
        return <YoutubeSearchedForIcon />;
      case 'managing':
        return <ManageSearchIcon />;
      case 'reviewing':
        return <ErrorIcon />;
      case 'downloading':
        return <CloudDownloadIcon />;
      case 'done':
        return <DownloadDoneIcon />;
      case 'paused':
        return <PauseCircleIcon />;
      case 'deleted':
        return <RemoveCircleIcon />;
      case 'held':
        return <PendingIcon />;
    }
  }

  return (
    <div>
      {props.data.map(({ id, thash, status, medium }) => (
        <MediumSmall
          key={id}
          type={type(medium.type)}
          id={getID(medium)}
          active={medium.active}
          background={medium.cover}
          primary={medium.title}
          secondary={medium.display}
          release={medium.release_date}
          progress={progress(thash)}
          download={true}
          downloadIcon={icon(status)}
        />
      ))}
    </div>
  );
}
