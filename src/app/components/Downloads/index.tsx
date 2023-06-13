import * as React from 'react';
import { Link } from 'react-router-dom';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ErrorIcon from '@mui/icons-material/Error';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

import { Banner } from '../MediumLarge/Banner';

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
        return <SearchIcon fontSize="large" />;
      case 'loading':
        return <YoutubeSearchedForIcon fontSize="large" />;
      case 'managing':
        return <ManageSearchIcon fontSize="large" />;
      case 'reviewing':
        return <ErrorIcon fontSize="large" />;
      case 'downloading':
        return <CloudDownloadIcon fontSize="large" />;
      case 'done':
        return <DownloadDoneIcon fontSize="large" />;
      case 'paused':
        return <PauseCircleIcon fontSize="large" />;
      case 'deleted':
        return <RemoveCircleIcon fontSize="large" />;
      case 'held':
        return <PendingIcon fontSize="large" />;
    }
  }

  return (
    <div>
      {props.data.map(({ id, thash, status, medium }) => (
        <Link key={id} to={`/downloads/${id}`}>
          <Banner
            id={id}
            cover={medium.cover}
            background={medium.background}
            progress={Number(progress(thash)).toFixed(2)}
            eta={eta(thash)}
            queue={queue(thash)}
            title={medium.title}
            subtitle={medium.display}
            release_date={medium.release_date}
            favorite={medium.favorite}
            broken={medium.broken}
            active={medium.active}
            downloadIcon={icon(status)}
            change={props.change}
          />
        </Link>
      ))}
    </div>
  );
}
