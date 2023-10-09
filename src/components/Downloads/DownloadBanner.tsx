import * as React from 'react';
import { useCallback, useState } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
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
import Chip from '@mui/material/Chip';

import Banner from 'components/Banner';

export function DownloadBanner(props) {
  const [auto, setAuto] = useState(props.download.auto);
  const [multi, setMulti] = useState(props.download.multi);
  const [force, setForce] = useState(props.download.force);
  const { id, medium, status, thash } = props.download;
  const { cover, background, title, display, release_date, favorite, broken, active } = medium;
  const navigate = useNavigate();

  const complete = useCallback(ev => {
    console.log('clicked complete');
    ev.preventDefault(); // for the buttons inside the Link component
  }, []);

  const gotoMedia = useCallback(() => {
    if (!medium) {
      return;
    }
    let id = medium.id;
    let type = 'series';
    switch (medium.type) {
      case 'Episode':
        id = medium.series_id;
        break;
      case 'Series':
        break;
      case 'Movie':
        type = 'movies';
        break;
    }

    navigate('/' + type + '/' + id);
  }, [medium, navigate]);

  const buttons = [
    {
      icon: <ArrowCircleLeftIcon color="primary" />,
      // click: <Link to={`/${props.download?.media?.type}/${props.download?.media?.id}`} />,
      click: ev => gotoMedia(),
      title: 'Go to Media',
    },
    {
      icon: <CheckCircleIcon color="primary" />,
      click: complete,
      title: 'mark complete',
    },
    {
      icon: <ChangeCircleIcon color="primary" />,
      click: complete,
      title: 'reset',
    },
    {
      icon: <OfflineBoltIcon color={auto ? 'secondary' : 'action'} />,
      click: ev => {
        props.change('auto', !auto);
        setAuto(!auto);
        ev.preventDefault(); // for the buttons inside the Link component
      },
      title: 'toggle auto',
    },
    {
      icon: <PlaylistAddCheckCircleIcon color={multi ? 'secondary' : 'action'} />,
      click: ev => {
        props.change('multi', !multi);
        setMulti(!multi);
        ev.preventDefault(); // for the buttons inside the Link component
      },
      title: 'toggle multi',
    },
    {
      icon: <SwapHorizontalCircleIcon color={force ? 'secondary' : 'action'} />,
      click: ev => {
        props.change('force', !force);
        setForce(!force);
        ev.preventDefault(); // for the buttons inside the Link component
      },
      title: 'toggle force',
    },
    {
      icon: <CancelIcon color="error" />,
      click: complete,
      title: 'delete',
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

  function tertiary() {
    return (
      <>
        <Icon status={status} />
        <Progress value={progress()} />
        <Eta eta={eta()} />
        <Queue queue={queue()} />
      </>
    );
  }

  return (
    <Banner
      id={id}
      cover={cover}
      background={background}
      title={title}
      subtitle={display}
      release_date={release_date}
      favorite={favorite}
      broken={broken}
      active={active}
      buttons={buttons}
      tertiary={tertiary()}
    />
  );
}

function Queue({ queue }) {
  if (!queue) {
    return null;
  }
  return <Chip label={queue} size="small" />;
}

function Progress({ value }) {
  if (value && value > 0) {
    return <span>{Number(value).toFixed(2)}%</span>;
  }
  return null;
}

function Eta({ eta }) {
  if (!eta) {
    return null;
  }
  return <Moment fromNow>{eta}</Moment>;
}

function Icon({ status }) {
  switch (status) {
    case 'searching':
      return <SearchIcon fontSize="medium" />;
    case 'loading':
      return <YoutubeSearchedForIcon fontSize="medium" />;
    case 'managing':
      return <ManageSearchIcon fontSize="medium" />;
    case 'reviewing':
      return <ErrorIcon fontSize="medium" />;
    case 'downloading':
      return <CloudDownloadIcon fontSize="medium" />;
    case 'done':
      return <DownloadDoneIcon fontSize="medium" />;
    case 'paused':
      return <PauseCircleIcon fontSize="medium" />;
    case 'deleted':
      return <RemoveCircleIcon fontSize="medium" />;
    case 'held':
      return <PendingIcon fontSize="medium" />;
    default:
      return <SearchIcon fontSize="medium" />;
  }
}
