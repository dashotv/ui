import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DownloadFile } from 'types/download';
import { Medium } from 'types/medium';
import { Torrent } from 'types/torrents';

import Files from './Files';

export function FilesWithSelector({
  files,
  episodes,
  torrent,
  updater,
}: {
  files?: DownloadFile[];
  episodes?: Medium[];
  torrent?: Torrent;
  updater: (id: string | null, num: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('title');
  const [selected, setSelected] = useState(0);
  const [tracking, setTracking] = useState<Map<string, number>>(new Map<string, number>());

  const getFile = useCallback(
    num => {
      return files?.filter(e => {
        return e.num === num;
      })[0];
    },
    [files],
  );

  const getEpisode = useCallback(
    id => {
      return episodes?.filter(e => {
        // console.log('episode: ', id, e.id === id);
        return e.id === id;
      })[0];
    },
    [episodes],
  );

  const selector = useCallback(
    id => {
      const f = getFile(selected);
      const ep = getEpisode(id);
      if (!f || !ep) {
        return;
      }
      f.medium = ep;
      tracking.set(id, selected);
      setTracking(tracking);
      // console.log(tracking);
      updater(id, selected);
    },
    [getEpisode, setTracking, tracking, selected, getFile],
  );

  const handleClickOpen = useCallback(
    (num, title) => {
      setSelected(num);
      setDialogTitle(title);
      setOpen(true);
    },
    [setSelected, setDialogTitle, setOpen],
  );

  const handleClickClear = useCallback(
    num => {
      const f = getFile(num);
      if (!f) {
        return;
      }
      f.medium = undefined;
      updater(null, num);
    },
    [getFile, updater],
  );

  const handleDialogClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    // console.log('useEffect update tracking');
    if (!files) {
      return;
    }
    const newTracking = new Map<string, number>();
    for (const f of files) {
      if (f.medium_id !== null && f.medium_id !== '000000000000000000000000') {
        newTracking.set(f.medium_id, f.num);
      }
    }
    setTracking(newTracking);
    // console.log(newTracking);
  }, [setTracking, files]);

  return (
    <>
      <Files files={files} torrent={torrent} open={handleClickOpen} clear={handleClickClear} />
      <Dialog
        open={open}
        onClose={handleDialogClose}
        scroll="paper"
        keepMounted
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" fontSize="small">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <List>
            {episodes &&
              episodes.map((e, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton
                    id={e.id}
                    onClick={ev => {
                      selector(ev.currentTarget.id);
                      handleDialogClose();
                    }}
                  >
                    <ListItemIcon>
                      <CheckCircleIcon
                        color={
                          tracking.get(e.id) === selected ? 'primary' : tracking.has(e.id) ? 'secondary' : 'action'
                        }
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <Stack spacing={1} direction="row">
                        <Typography variant="subtitle2">
                          {e.season_number}x{e.episode_number}
                        </Typography>
                        <Typography variant="body2">{e.title}</Typography>
                      </Stack>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
