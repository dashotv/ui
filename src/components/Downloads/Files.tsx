import * as React from 'react';
import { useCallback, useState } from 'react';

import { DownloadFile } from 'client/tower';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import StarsIcon from '@mui/icons-material/Stars';
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ButtonMap, ButtonMapButton, Row } from '@dashotv/components';

import { useTorrentWantMutation } from 'query/releases';
import { Torrent } from 'types/torrents';

const filtersDefaults = { name: '' };

export function Files({
  files,
  torrent,
  open,
  clear,
}: {
  files?: DownloadFile[];
  torrent?: Torrent;
  open: (num: number, name: string | undefined) => void;
  clear: (nums: number[] | undefined) => void;
}) {
  const [filters, setFilters] = useState(filtersDefaults);
  const { mutate: want } = useTorrentWantMutation();

  const filtered = filters.name != '' ? files?.filter(f => f.torrent_file?.name?.includes(filters.name)) : files;

  // useEffect(() => {
  //   if (!files) {
  //     return;
  //   }
  //   if (torrent) {
  //     for (let i = 0; i < files.length; i++) {
  //       const f = files[i];
  //       f.torrent_file = torrent.Files[f.num!];
  //     }
  //     const hasTorrentFiles = files
  //       .filter(f => f.torrent_file != null && f.torrent_file.name != null)
  //       .sort((a, b) => (a.torrent_file?.name! > b.torrent_file?.name! ? 1 : -1));
  //     const noTorrentFiles = files
  //       .filter(f => f.torrent_file == null)
  //       .sort((a, b) => a.torrent_file!.name!.localeCompare(b.torrent_file!.name!));
  //     let list = hasTorrentFiles.concat(noTorrentFiles);
  //     if (filters.name !== '') {
  //       list = list.filter(f => f.torrent_file?.name?.includes(filters.name));
  //     }
  //     setSortedFiles(list);
  //     return;
  //   }
  //   setSortedFiles(files.sort((a, b) => (a.num || 0) - (b.num || 0)));
  // }, [files, torrent]);

  const setName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, name: e.target.value });
    },
    [filters],
  );

  const clearVisible = () => {
    if (!filtered || filtered.length === 0) {
      return;
    }
    const list = filtered?.filter(f => f.torrent_file != null && f.num !== undefined && f.num >= 0).map(f => f.num!);
    if (!list || list.length === 0) {
      return;
    }
    const nums = list.filter(f => f !== undefined && f >= 0);
    clear(nums);
  };

  const wantVisible = () => {
    if (!torrent || !torrent.Hash) {
      return;
    }

    const list = filtered?.filter(f => f.torrent_file != null && f.num !== undefined && f.num >= 0).map(f => f.num);
    if (!list || list.length === 0) {
      return;
    }

    want({ hash: torrent.Hash, id: list.join(',') });
  };

  const wantNone = () => {
    if (!torrent || !torrent.Hash) {
      return;
    }
    want({ hash: torrent.Hash, id: 'none' });
  };

  const buttons: ButtonMapButton[] = [
    {
      Icon: CancelIcon,
      color: 'warning',
      click: () => clearVisible(),
      title: 'unselect',
    },
    {
      Icon: StarsIcon,
      color: 'warning',
      click: () => wantNone(),
      title: 'want none',
    },
    {
      Icon: StarsIcon,
      color: 'primary',
      click: () => wantVisible(),
      title: 'want visible',
    },
  ];

  return (
    <>
      <Paper elevation={1} sx={{ p: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <TextField type="search" label="Filter" variant="outlined" size="small" onChange={setName} />
          <ButtonMap buttons={buttons} size="small" />
        </Stack>
      </Paper>
      <Paper elevation={0}>
        {filtered?.map(row => <FilesRow key={row.num} file={row} thash={torrent?.Hash} open={open} clear={clear} />)}
      </Paper>
    </>
  );
}

interface FilesRowProps {
  open: (num: number, name: string | undefined) => void;
  clear: (nums: number[] | undefined) => void;
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
      click: () => clear(num !== undefined && num >= 0 ? [num] : []),
      title: 'unselect',
    },
    {
      Icon: PlaylistAddCircleIcon,
      color: medium ? 'secondary' : 'disabled',
      click: () => open(num !== undefined && num >= 0 ? num : -1, name(torrent_file?.name)),
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
        want({ hash: thash, id: torrent_file?.id !== undefined ? torrent_file.id : -1 });
      },
      title: 'priority',
    },
  ];

  // console.log('filerow: ', num, torrent_file, medium);

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
