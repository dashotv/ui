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

import Files from './Files';

export function FilesWithSelector(props) {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('title');
  const [selected, setSelected] = useState(0);
  const [tracking, setTracking] = useState<Map<string, number>>(new Map<string, number>());

  const getFile = useCallback(
    num => {
      return props.files.filter(e => {
        return e.num === num;
      })[0];
    },
    [props.files],
  );

  const getEpisode = useCallback(
    id => {
      return props.episodes.filter(e => {
        // console.log('episode: ', id, e.id === id);
        return e.id === id;
      })[0];
    },
    [props.episodes],
  );

  const selector = useCallback(
    id => {
      const f = getFile(selected);
      const ep = getEpisode(id);
      f.medium = ep;
      tracking.set(id, selected);
      setTracking(tracking);
      // console.log(tracking);
      props.updater(id, selected);
    },
    [getEpisode, setTracking, tracking, props, selected, getFile],
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
      f.medium = null;
      props.updater(null, num);
    },
    [getFile, props],
  );

  const handleDialogClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    // console.log('useEffect update tracking');
    if (!props.files) {
      return;
    }
    const newTracking = new Map<string, number>();
    for (const f of props.files) {
      if (f.medium_id !== null && f.medium_id !== '000000000000000000000000') {
        newTracking.set(f.medium_id, f.num);
      }
    }
    setTracking(newTracking);
    // console.log(newTracking);
  }, [setTracking, props.files]);

  return (
    <>
      <Files files={props.files} torrent={props.torrent} open={handleClickOpen} clear={handleClickClear} />
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
            {props.episodes &&
              props.episodes.map((e, i) => (
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

// function SelectPopover(props) {
//   return (
//     <Popover
//       id={pid}
//       open={open}
//       anchorEl={anchorEl}
//       onClose={handleClose}
//       keepMounted
//       anchorOrigin={{
//         vertical: 'center',
//         horizontal: 'left',
//       }}
//       transformOrigin={{
//         vertical: 'center',
//         horizontal: 'right',
//       }}
//       sx={{ maxHeight: '400px;' }}
//     >
//       <List>
//         {props.episodes &&
//           props.episodes.map((e, i) => (
//             <ListItem key={i} disablePadding>
//               <ListItemButton
//                 id={e.id}
//                 onClick={ev => {
//                   selector(ev.currentTarget.id);
//                   handleClose();
//                 }}
//               >
//                 <ListItemText primary={`${e.season_number}x${e.episode_number} ${e.title}`} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//       </List>
//     </Popover>
//   );
// }
