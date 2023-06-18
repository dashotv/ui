import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';

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

import { DownloadBanner } from '../Downloads';
import { useSubscription } from '../Nats/useSubscription';
import Files from './Files';
import { MediumTabs } from './MediumTabs';
import './large.scss';

export default function MediumDownload(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { id, download } = props;

  const changeSetting = useCallback(
    (setting, value) => {
      axios
        .put(`/api/tower/downloads/${id}`, {
          setting: setting,
          value: value,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    },
    [enqueueSnackbar, id],
  );

  const selectMedium = useCallback(
    (eid, num) => {
      axios
        .put(`/api/tower/downloads/${id}/select`, {
          mediumId: eid,
          num: num,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    },
    [id, enqueueSnackbar],
  );

  useSubscription(
    'seer.downloads',
    useCallback(
      data => {
        if (download === null) {
          return;
        }

        if (id === data.id) {
          download.status = data.download.status;
          download.thash = data.download.thash;
          download.url = data.download.url;
          download.releaseId = data.download.releaseId;
        }
      },
      [id, download],
    ),
  );

  const tabsMap = {
    Files: (
      <FilesWithSelector files={props.files} torrent={props.torrent} episodes={props.episodes} updater={selectMedium} />
    ),
  };

  return (
    <div className="medium large">
      <DownloadBanner
        id={id}
        download={props.download}
        torrents={props.torrents}
        nzbs={props.nzbs}
        nzbStatus={props.nzbStatus}
        change={changeSetting}
      />
      <MediumTabs data={tabsMap} />
    </div>
  );
}

function FilesWithSelector(props) {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('title');
  const [selected, setSelected] = useState(0);
  const [tracking, setTracking] = useState<Map<String, Number>>(new Map<String, Number>());

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
        console.log('episode: ', id, e.id === id);
        return e.id === id;
      })[0];
    },
    [props.episodes],
  );

  const selector = useCallback(
    id => {
      let f = getFile(selected);
      let ep = getEpisode(id);
      console.log('selector:', id, 'selected:', selected, 'found:', ep?.id);
      f.medium = ep;
      setTracking(prevState => {
        prevState[id] = selected;
        return prevState;
      });
      props.updater(id, selected);
    },
    [getEpisode, props, selected, getFile],
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
      let f = getFile(num);
      f.medium = null;
      props.updater(null, num);
    },
    [getFile, props],
  );

  const handleDialogClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    console.log('useEffect update tracking');
    if (!props.files) {
      return;
    }
    let newTracking = new Map<string, number>();
    for (const f of props.files) {
      if (f.medium_id !== null) {
        newTracking[f.medium_id] = f.num;
      }
    }
    setTracking(newTracking);
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
                        color={tracking[e.id] === selected ? 'primary' : tracking[e.id] ? 'secondary' : 'action'}
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
