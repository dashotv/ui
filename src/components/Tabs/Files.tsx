import * as React from 'react';
import { useCallback } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import StarsIcon from '@mui/icons-material/Stars';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ButtonMap, ButtonMapButton, Row } from 'components/Common';
import { DownloadFile } from 'components/Downloads';
import { useTorrentWantMutation } from 'query/releases';
import { Torrent } from 'types/torrents';

export function Files({
  files,
  torrent,
  open,
  clear,
}: {
  files?: DownloadFile[];
  torrent?: Torrent;
  open: (num: number, name: string | undefined) => void;
  clear: (num: number) => void;
}) {
  // console.log('files:', props.files);
  // console.log('torrent:', props.torrent);
  const sortedFiles = useCallback((files?: DownloadFile[], torrent?: Torrent) => {
    if (!files) {
      return [];
    }
    if (torrent) {
      for (let i = 0; i < files.length; i++) {
        files[i].torrent_file = torrent.Files[files[i].num];
      }
      const hasTorrentFiles = files.filter(f => f.torrent_file != null);
      const noTorrentFiles = files.filter(f => f.torrent_file == null);
      return hasTorrentFiles
        .sort((a, b) => a.torrent_file!.name.localeCompare(b.torrent_file!.name))
        .concat(noTorrentFiles.sort((a, b) => a.num - b.num));
    }
    return files.sort((a, b) => a.num - b.num);
  }, []);

  return (
    <Paper elevation={0}>
      {sortedFiles(files, torrent).map(row => (
        <FilesRow key={row.num} file={row} thash={torrent?.Hash} open={open} clear={clear} />
      ))}
    </Paper>
  );
}

interface FilesRowProps {
  open: (num: number, name: string | undefined) => void;
  clear: (num: number) => void;
  thash?: string;
  file: DownloadFile;
}
function FilesRow({ open, clear, thash, file: { num, torrent_file, medium } }: FilesRowProps) {
  const { season_number, episode_number, absolute_number, title, display } = medium || {};
  const { mutate: want } = useTorrentWantMutation();
  function size(raw: number | undefined) {
    if (raw === undefined) {
      return;
    }
    return Number(raw / 1000000).toFixed(2) + 'mb';
  }

  function progress(raw: number | undefined) {
    if (raw === undefined) {
      return;
    }
    return Number(raw).toFixed(2) + '%';
  }

  function name(raw: string | undefined) {
    if (raw === undefined) {
      return;
    }
    return raw.split('/').pop();
  }
  const buttons: ButtonMapButton[] = [
    {
      Icon: CancelIcon,
      color: 'warning',
      click: () => clear(num),
      title: 'unselect',
    },
    {
      Icon: PlaylistAddCircleIcon,
      color: medium ? 'secondary' : 'disabled',
      click: () => open(num, name(torrent_file?.name)),
      title: 'select',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: medium?.downloaded ? 'secondary' : 'disabled',
      title: 'downloaded',
    },
    {
      Icon: CheckCircleIcon,
      color: medium?.completed ? 'secondary' : 'disabled',
      title: 'downloaded',
    },
    {
      Icon: StarsIcon,
      color: torrent_file?.priority && torrent_file.priority > 0 ? 'secondary' : 'disabled',
      click: () => {
        if (!torrent_file || !thash) {
          return;
        }
        want({ hash: thash, id: torrent_file?.id });
      },
      title: 'priority',
    },
  ];

  return (
    <Row>
      <Stack
        key={num}
        direction={{ xs: 'column', md: 'row' }}
        spacing={0}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          minWidth="0"
          width="100%"
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 2 }}
          alignItems="center"
          justifyContent="start"
        >
          <Typography
            display={{ xs: 'none', md: 'inherit' }}
            noWrap
            variant="subtitle1"
            color="textSecondary"
            justifyContent="end"
            minWidth="38px"
          >
            {num}
          </Typography>
          <Typography
            title={torrent_file?.name}
            minWidth="100px"
            width={{ xs: '100%', md: 'auto' }}
            fontWeight="bolder"
            noWrap
            color="primary"
          >
            {name(torrent_file?.name)}
          </Typography>
          {medium && (
            <Typography minWidth="100px" width={{ xs: '100%', md: '225px' }} variant="subtitle2" noWrap color="gray">
              {season_number}x{episode_number}
              {absolute_number ? ` #${absolute_number}` : ''} {title} {display}
            </Typography>
          )}
        </Stack>
        <Stack
          minWidth="300px"
          width={{ xs: '100%', md: 'auto' }}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="end"
        >
          <Typography
            display={{ xs: 'inherit', md: 'none' }}
            noWrap
            variant="subtitle1"
            color="textSecondary"
            minWidth="38px"
          >
            {num}
          </Typography>
          <Typography minWidth="75px" variant="subtitle2" noWrap color="secondary" textAlign="right">
            {progress(torrent_file?.progress)}
          </Typography>
          <Typography minWidth="85px" variant="subtitle2" noWrap color="gray" textAlign="right">
            {size(torrent_file?.size)}
          </Typography>
          <ButtonMap buttons={buttons} size="small" />
        </Stack>
      </Stack>
    </Row>
  );
}
