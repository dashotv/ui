import React, { useState } from 'react';

import { useDebounce } from 'usehooks-ts';

import AddCircleIcon from '@mui/icons-material/AddCircle';
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
  Link,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/system/useTheme';

import { useQueryClient } from '@tanstack/react-query';

import { Chrono, LoadingIndicator } from 'components/Common';
import { Option } from 'components/Media';
import { PlexLibrary, usePlexLibrariesQuery, usePlexSearchQuery } from 'components/Plex';

import { Collection, useCollectionDeleteMutation, useCollectionUpdateMutation, useCollectionsQuery } from '.';

export const CollectionList = ({ page }: { page: number }) => {
  const { isFetching, data } = useCollectionsQuery(page);
  const { data: libraries } = usePlexLibrariesQuery();

  const getLibrary = (key: string) => {
    return libraries?.find(l => l.key === key);
  };

  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {isFetching && <LoadingIndicator />}
      {data?.results?.map(collection => (
        <Paper key={collection.id} elevation={0} sx={{ mb: 1, width: '100%' }}>
          <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography color="primary" noWrap minWidth={0}>
                {collection.name}
              </Typography>
              <Typography variant="subtitle2" color="primary.dark" noWrap minWidth={0}>
                {getLibrary(collection.library)?.title}
              </Typography>
              <Typography variant="subtitle2" color="gray" noWrap minWidth={0}>
                {collection.rating_key}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" justifyContent="flex-end" alignItems="center">
              <Typography noWrap fontWeight="bolder" color="action" pr={1}>
                {collection.media ? collection.media.length : 0}
              </Typography>
              <Typography variant="subtitle2" color="gray" noWrap minWidth="0">
                <Chrono fromNow>{collection.created_at}</Chrono>
              </Typography>
              <CollectionActions {...{ collection, libraries }} />
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Paper>
  );
};

export const CollectionActions = ({ collection, libraries }: { collection: Collection; libraries?: PlexLibrary[] }) => {
  const queryClient = useQueryClient();
  const updater = useCollectionUpdateMutation();
  const deleter = useCollectionDeleteMutation();
  const remove = e => {
    e.preventDefault();
    e.stopPropagation();
    deleter.mutate(collection.id, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        queryClient.invalidateQueries({ queryKey: ['collections', 1] });
      },
    });
  };

  const update = (collection: Collection) => {
    updater.mutate(collection, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        queryClient.invalidateQueries({ queryKey: ['collections', 1] });
      },
    });
  };

  return (
    <Stack spacing={'5px'} direction="row" sx={{ justifyContent: 'end' }}>
      <CollectionDialog {...{ update, collection, libraries }} />
      <IconButton onClick={remove} color="error" size="small">
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

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

  const remove = (id: string) => {
    if (!collection.media) return;
    collection.media = collection.media.filter(media => media.rating_key !== id);
    update(collection);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} size="small" color="primary">
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="md">
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
            <Stack spacing={1} direction="row" alignItems="center" width="100%">
              <Typography variant="button" noWrap minWidth={0}>
                Rating Key
              </Typography>
              <Typography variant="subtitle2" color="gray" noWrap minWidth={0}>
                {collection.rating_key}
              </Typography>
              <Typography variant="button" noWrap minWidth={0}>
                Synced
              </Typography>
              <Typography variant="subtitle2" color="gray" noWrap minWidth={0}>
                <Chrono fromNow>{collection.synced_at}</Chrono>
              </Typography>
            </Stack>
          </Paper>
          <Paper elevation={1} sx={{ p: 1, width: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Typography color="primary">Media</Typography>
              <AddDialog {...{ library, confirm }} />
            </Stack>
            <Stack direction="column" sx={{ width: '100%' }}>
              {collection.media?.map(media => (
                <Stack key={media.rating_key} direction="row" spacing={1} width="100%" justifyContent="space-between">
                  <Typography>{media.title}</Typography>
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

const AddDialog = ({ library, confirm }: { library: string; confirm: (option: Option) => void }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 400);
  const { data } = usePlexSearchQuery(debouncedValue, library);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color="primary" size="small">
        <AddCircleIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen} maxWidth="md">
        <DialogTitle>
          <TextField
            autoFocus
            id="name"
            placeholder="Search for existing or new media"
            hiddenLabel
            fullWidth
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value);
            }}
            variant="outlined"
            size="small"
            sx={{ pr: 4 }}
          />
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
        <DialogContent sx={{ height: '300px' }}>
          {data?.map(({ ratingKey, title, type, year }) => (
            <Link
              key={ratingKey}
              href="#"
              underline="none"
              onClick={() => {
                confirm({ ID: ratingKey, Title: title, Type: type, Date: year.toString(), Source: 'plex' });
                setOpen(false);
              }}
            >
              <Typography noWrap>
                {title} ({year})
              </Typography>
            </Link>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
