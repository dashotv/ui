import * as React from 'react';
import { useCallback } from 'react';

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

export function DownloadBanner(props) {
  const { id, medium, status, thash } = props.download;

  const progress = useCallback(() => {
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
  }, [props.nzbs, props.torrents, thash]);

  const eta = useCallback(() => {
    if (props.torrents != null) {
      const torrent = props.torrents.get(thash);
      if (torrent) {
        if (torrent.Finish > 0) return new Date(Date.now() + torrent.Finish * 1000);
      }
    }

    if (props.nzbs != null) {
      const nzb = props.nzbs.get(Number(thash));
      if (nzb) {
        if (props.nzbStatus?.DownloadRate > 0) {
          const secs = (nzb.RemainingSizeMB * 1024) / (props.nzbStatus.DownloadRate / 1024);
          return new Date(Date.now() + secs * 1000);
        }
      }
    }

    return null;
  }, [props.nzbs, props.torrents, thash, props.nzbStatus?.DownloadRate]);

  const queue = useCallback(() => {
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
  }, [props.nzbs, props.torrents, thash]);

  const icon = useCallback(() => {
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
  }, [status]);

  return (
    <Banner
      id={id}
      cover={medium?.cover}
      background={medium?.background}
      title={medium?.title}
      subtitle={medium?.display}
      release_date={medium?.release_date}
      favorite={medium?.favorite}
      broken={medium?.broken}
      active={medium?.active}
      change={props.change}
      progress={Number(progress()).toFixed(2)}
      eta={eta()}
      queue={queue()}
      downloadIcon={icon()}
    />
  );
}
