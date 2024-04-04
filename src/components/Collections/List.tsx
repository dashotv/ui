import React, { useState } from 'react';

import { Collection } from 'client/tower';
import { useDebounce } from 'usehooks-ts';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
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

import { CollectionDialog, useCollectionDeleteMutation, useCollectionUpdateMutation, useCollectionsQuery } from '.';

export const CollectionList = ({ page }: { page: number }) => {
  const { isFetching, data } = useCollectionsQuery(page);
  const { data: libraries } = usePlexLibrariesQuery();

  const getLibrary = (key: string) => {
    return libraries?.result.find(l => l.key === key);
  };

  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {isFetching && <LoadingIndicator />}
      {data?.result?.map(collection => (
        <Paper key={collection.id} elevation={0} sx={{ mb: 1, width: '100%' }}>
          <Stack spacing={1} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
            <Stack spacing={1} direction="row" alignItems="center" width="100%" justifyContent="flex-start">
              <Typography color="primary" noWrap minWidth={0}>
                {collection.name}
              </Typography>
              <Typography variant="subtitle2" color="primary.dark" noWrap minWidth={0}>
                {collection?.library ? getLibrary(collection.library)?.title : null}
              </Typography>
              <Typography variant="subtitle2" color="gray" noWrap minWidth={0}>
                {collection.rating_key}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" justifyContent="flex-end" alignItems="center" width="100%">
              <Typography noWrap fontWeight="bolder" color="action" pr={1}>
                {collection.media ? collection.media.length : 0}
              </Typography>
              <Typography variant="subtitle2" color="gray" noWrap minWidth="0">
                <Chrono fromNow>{collection.created_at}</Chrono>
              </Typography>
              <CollectionActions {...{ collection, libraries: libraries?.result }} />
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
  if (!collection || !collection.id) {
    return null;
  }
  const remove = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!collection.id) {
      return;
    }
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
    if (!collection) {
      return;
    }
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

export const AddDialog = ({ library, confirm }: { library: string; confirm: (option: Option) => void }) => {
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
                confirm({ ID: ratingKey, Title: title, Type: type, Date: year?.toString(), Source: 'plex' });
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
