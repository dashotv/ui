import * as React from 'react';
import { useCallback, useState } from 'react';
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
import Stack from '@mui/material/Stack';

import { Banner } from 'components/Banner';
import { ButtonMapButton } from 'components/ButtonMap';
import Chrono from 'components/Chrono';
import { Nzb, NzbResponseStatus } from 'types/Nzb';
import { Download } from 'types/download';
import { Torrent } from 'types/torrents';

export type DownloadBannerProps = {
  id: string;
  variant?: 'small' | 'large' | undefined;
  buttons?: ButtonMapButton[];
  download: Download;
  torrents?: Map<string, Torrent> | null;
  nzbs?: Map<number, Nzb> | null;
  nzbStatus?: NzbResponseStatus | null;
  change?: (key: string, value: boolean) => void;
};
export function DownloadBanner({ variant, change: changer, download, torrents, nzbs, nzbStatus }: DownloadBannerProps) {
  const [auto, setAuto] = useState(download.auto);
  const [multi, setMulti] = useState(download.multi);
  const [force, setForce] = useState(download.force);
  const {
    id,
    medium,
    status,
    thash,
    medium: { cover, background, title, display },
  } = download;
  const navigate = useNavigate();

  const large = variant === 'large';
  const change = (name: string, value: boolean) => {
    if (changer) {
      changer(name, value);
    }
  };

  const complete = useCallback(ev => {
    console.log('clicked complete');
    ev.preventDefault(); // for the buttons inside the Link component
  }, []);

  // TODO: create general MediaLink component or something like that
  const gotoMedia = useCallback(() => {
    if (!medium) {
      return;
    }
    let id = medium.id;
    let type = 'series';
    switch (medium.type) {
      case 'Episode':
        if (medium.series_id === undefined) {
          navigate('/404');
          return;
        }
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
      click: () => gotoMedia(),
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
        change('auto', !auto);
        setAuto(!auto);
        ev.preventDefault(); // for the buttons inside the Link component
      },
      title: 'toggle auto',
    },
    {
      icon: <PlaylistAddCheckCircleIcon color={multi ? 'secondary' : 'action'} />,
      click: ev => {
        change('multi', !multi);
        setMulti(!multi);
        ev.preventDefault(); // for the buttons inside the Link component
      },
      title: 'toggle multi',
    },
    {
      icon: <SwapHorizontalCircleIcon color={force ? 'secondary' : 'action'} />,
      click: ev => {
        change('force', !force);
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
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        return Number(torrent.Progress);
      }
    }

    if (nzbs != null) {
      const nzb = nzbs.get(Number(thash));
      if (nzb) {
        return 100.0 - (nzb.RemainingSizeMB / nzb.FileSizeMB) * 100;
      }
    }

    return 0;
  }, [nzbs, torrents, thash]);

  const eta = useCallback(() => {
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        if (torrent.Finish > 0) return new Date(Date.now() + torrent.Finish * 1000);
      }
    }

    if (nzbs != null) {
      const nzb = nzbs.get(Number(thash));
      if (nzb && nzb !== undefined && nzbStatus && nzbStatus !== undefined) {
        if (nzbStatus.DownloadRate > 0) {
          const secs = (nzb.RemainingSizeMB * 1024) / (nzbStatus.DownloadRate / 1024);
          return new Date(Date.now() + secs * 1000);
        }
      }
    }

    return null;
  }, [nzbs, torrents, thash, nzbStatus?.DownloadRate]);

  const queue = useCallback(() => {
    if (torrents != null) {
      const torrent = torrents.get(thash);
      if (torrent) {
        return torrent.Queue;
      }
    }

    if (nzbs != null) {
      const nzb = nzbs.get(Number(thash));
      if (nzb) {
        return nzb.nzbid;
      }
    }

    return 0;
  }, [nzbs, torrents, thash]);

  function tertiary() {
    return (
      <Stack spacing={1} direction="row">
        <Icon status={status} />
        <Progress value={progress()} />
        <Eta eta={eta()} />
        <Queue queue={queue().toString()} />
        {status == 'done' && <Chrono fromNow>{download.updated_at}</Chrono>}
      </Stack>
    );
  }
  const images: () => string[] = () => {
    const out: string[] = [];
    if (background) {
      out.push(background);
    }
    if (cover) {
      out.push(cover);
    }
    return out;
  };
  return (
    <Banner
      id={id}
      images={images()}
      title={title}
      subtitle={display}
      tertiary={tertiary()}
      buttons={large ? buttons : undefined}
    />
  );
}

function Queue({ queue }: { queue?: string | null }) {
  if (!queue || queue === '0') {
    return null;
  }
  return <Chip label={queue} size="small" />;
}

function Progress({ value }: { value?: number }) {
  if (value && value > 0) {
    return <span>{Number(value).toFixed(2)}%</span>;
  }
  return <span></span>;
}

function Eta({ eta }: { eta?: Date | null }) {
  if (!eta) {
    return null;
  }
  return <Chrono fromNow>{eta.toString()}</Chrono>;
}

function Icon({ status }: { status: string | undefined }) {
  switch (status) {
    case 'searching':
      return (
        <div title="searching">
          <SearchIcon fontSize="medium" />
        </div>
      );
    case 'loading':
      return (
        <div title="loading">
          <YoutubeSearchedForIcon fontSize="medium" />
        </div>
      );
    case 'managing':
      return (
        <div title="managing">
          <ManageSearchIcon fontSize="medium" />
        </div>
      );
    case 'reviewing':
      return (
        <div title="reviewing">
          <ErrorIcon fontSize="medium" />
        </div>
      );
    case 'downloading':
      return (
        <div title="downloading">
          <CloudDownloadIcon fontSize="medium" />
        </div>
      );
    case 'done':
      return (
        <div title="done">
          <DownloadDoneIcon fontSize="medium" />
        </div>
      );
    case 'paused':
      return (
        <div title="paused">
          <PauseCircleIcon fontSize="medium" />
        </div>
      );
    case 'deleted':
      return (
        <div title="deleted">
          <RemoveCircleIcon fontSize="medium" />
        </div>
      );
    case 'held':
      return (
        <div title="held">
          <PendingIcon fontSize="medium" />
        </div>
      );
    default:
      return (
        <div title="search">
          <SearchIcon fontSize="medium" />
        </div>
      );
  }
}
