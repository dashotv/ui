import * as React from 'react';
import { useCallback } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import StarsIcon from '@mui/icons-material/Stars';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ButtonMap, ButtonMapButton } from 'components/Common';
import { DownloadFile } from 'components/Downloads';
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
      return files.sort((a, b) => a.torrent_file!.name.localeCompare(b.torrent_file!.name));
    }
    return files.sort((a, b) => a.num - b.num);
  }, []);

  return (
    <Paper elevation={0}>
      {sortedFiles(files, torrent).map(row => (
        <FilesRow key={row.num} file={row} open={open} clear={clear} />
      ))}
    </Paper>
  );
}

interface FilesRowProps {
  open: (num: number, name: string | undefined) => void;
  clear: (num: number) => void;
  file: DownloadFile;
}
function FilesRow({ open, clear, file: { num, torrent_file, medium } }: FilesRowProps) {
  const { season_number, episode_number, absolute_number, title, display } = medium || {};
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
      color: medium ? 'secondary' : 'action',
      click: () => open(num, name(torrent_file?.name)),
      title: 'select',
    },
    {
      Icon: CheckCircleIcon,
      color: medium?.downloaded ? 'secondary' : 'action',
      title: 'downloaded',
    },
    {
      Icon: StarsIcon,
      color: torrent_file?.priority && torrent_file.priority > 0 ? 'secondary' : 'action',
      click: () => {},
      title: 'priority',
    },
  ];

  return (
    <Paper elevation={1} sx={{ mb: 1, pr: 1, pl: 1, width: '100%' }}>
      <Stack
        key={num}
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack minWidth="0" width="100%" direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
          <Typography
            display={{ xs: 'none', md: 'inherit' }}
            noWrap
            variant="subtitle1"
            color="textSecondary"
            minWidth="38px"
          >
            {num}
          </Typography>
          <Typography maxWidth="100%" variant="h6" noWrap color="primary">
            {name(torrent_file?.name)}
          </Typography>
          {medium && (
            <Typography width={{ xs: '100%', md: '225px' }} variant="subtitle2" noWrap color="gray">
              {season_number}x{episode_number}
              {absolute_number ? ` #${absolute_number}` : ''} {title} {display}
            </Typography>
          )}
        </Stack>
        <Stack minWidth="0" direction="row" spacing={1} alignItems="center" justifyContent="end">
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
    </Paper>
  );
}
