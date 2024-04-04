import React, { useState } from 'react';

import { Collection } from 'client/tower';

import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/system/useTheme';

import { Chrono } from 'components/Common';
import { Option } from 'components/Media';
import { PlexLibrary } from 'components/Plex';

import { AddDialog } from './List';

export const CollectionDialog = ({
  collection,
  libraries,
  update,
}: {
  collection: Collection;
  libraries?: PlexLibrary[];
  update: (collection: Collection) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(collection.name);
  const [library, setLibrary] = useState<string>(collection.library || '');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const save = () => {
    if (!value || !library) {
      return;
    }

    collection.name = value;
    collection.library = library;
    update(collection);
  };

  const confirm = (option: Option) => {
    if (!collection.media) collection.media = [];

    const found = collection.media.find(media => media.rating_key === option.ID);
    if (found) return;

    collection.media.push({ rating_key: option.ID, title: option.Title });
    collection.name = value;
    update(collection);
  };

  const remove = (id?: string) => {
    if (!collection.media) return;
    if (!id) return;
    collection.media = collection.media.filter(media => media.rating_key !== id);
    update(collection);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} size="small" color="primary">
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="md" fullScreen={fullScreen}>
        <DialogTitle>
          Edit
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ minHeight: '300px' }}>
          <Paper elevation={1} sx={{ p: 1, mb: 2, width: '100%' }}>
            <Stack spacing={1} direction="row" alignItems="center" width="100%">
              <TextField
                autoFocus
                fullWidth
                error={!value}
                id="name"
                label="Name"
                margin="dense"
                type="search"
                variant="standard"
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(event.target.value);
                }}
              />
              <TextField
                fullWidth
                select
                error={!library}
                id="library"
                label="Library"
                margin="dense"
                type="search"
                variant="standard"
                value={library}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLibrary(event.target.value);
                }}
              >
                <MenuItem value="">None</MenuItem>
                {libraries?.map(l => (
                  <MenuItem key={l.key} value={l.key}>
                    {l.title} ({l.key})
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Paper>
          <Paper elevation={1} sx={{ p: 1, mb: 2, width: '100%' }}>
            <Stack spacing={1} direction="column" alignItems="center" width="100%">
              <Stack spacing={1} direction="row" alignItems="center" width="100%">
                <Typography variant="button" noWrap minWidth="125px">
                  Rating Key
                </Typography>
                <Typography variant="subtitle2" color="gray" noWrap minWidth={0}>
                  {collection.rating_key}
                </Typography>
              </Stack>
              <Stack spacing={1} direction="row" alignItems="center" width="100%">
                <Typography variant="button" noWrap minWidth="125px">
                  Synced
                </Typography>
                <Typography variant="subtitle2" color="gray" noWrap minWidth={0}>
                  <Chrono fromNow>{collection.synced_at}</Chrono>
                </Typography>
              </Stack>
            </Stack>
          </Paper>
          <Paper elevation={1} sx={{ p: 1, width: '100%', overflow: 'auto' }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2} justifyContent="space-between">
              <Typography color="primary">Media</Typography>
              <AddDialog {...{ library, confirm }} />
            </Stack>
            <Stack direction="column" sx={{ width: '100%' }} alignItems="center">
              {collection.media?.map(media => (
                <Stack
                  key={media.rating_key}
                  direction="row"
                  spacing={1}
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography minWidth="0" noWrap>
                    {media.title} ({media.rating_key})
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'end' }}>
                    <IconButton size="small" color="error" onClick={() => remove(media.rating_key)}>
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => save()}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
