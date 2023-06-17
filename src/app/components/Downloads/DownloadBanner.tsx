import * as React from 'react';
import { useCallback, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ErrorIcon from '@mui/icons-material/Error';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

import { Banner } from '../MediumLarge/Banner';

export function DownloadBanner(props) {
  const [auto, setAuto] = useState(props.download.auto);
  const [multi, setMulti] = useState(props.download.multi);
  const [force, setForce] = useState(props.download.force);
  const { id, medium, status, thash } = props.download;

  const complete = useCallback(ev => {
    console.log('clicked complete');
    ev.preventDefault(); // for the buttons inside the Link component
  }, []);

  const buttons = [
    {
      icon: <CheckCircleIcon color="primary" />,
      click: complete,
    },
    {
      icon: <ChangeCircleIcon color="primary" />,
      click: complete,
    },
    {
      icon: <OfflineBoltIcon color={auto ? 'secondary' : 'action'} />,
      click: ev => {
        props.change('auto', !auto);
        setAuto(!auto);
        ev.preventDefault(); // for the buttons inside the Link component
      },
    },
    {
      icon: <PlaylistAddCheckCircleIcon color={multi ? 'secondary' : 'action'} />,
      click: ev => {
        props.change('multi', !multi);
        setMulti(!multi);
        ev.preventDefault(); // for the buttons inside the Link component
      },
    },
    {
      icon: <SwapHorizontalCircleIcon color={force ? 'secondary' : 'action'} />,
      click: ev => {
        props.change('force', !force);
        setForce(!force);
        ev.preventDefault(); // for the buttons inside the Link component
      },
    },
    {
      icon: <CancelIcon color="error" />,
      click: complete,
    },
  ];

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
      buttons={buttons}
      progress={Number(progress()).toFixed(2)}
      eta={eta()}
      queue={queue()}
      downloadIcon={icon()}
    />
  );
}