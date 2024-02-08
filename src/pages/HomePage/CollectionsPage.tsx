import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import QueueIcon from '@mui/icons-material/Queue';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useQueryClient } from '@tanstack/react-query';

import { CollectionList, useCollectionMutation } from 'components/Collections';
import { Combinations } from 'components/Combinations';
import { Container } from 'components/Layout';
import { PlexLibrary, usePlexLibrariesQuery } from 'components/Plex';

export default function CollectionsPage() {
  const [page] = useState(1);
  const libraries = usePlexLibrariesQuery();
  const queryClient = useQueryClient();
  const collection = useCollectionMutation();
  const create = (name: string, library: string) => {
    const col = { name, library };
    collection.mutate(col, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        queryClient.invalidateQueries({ queryKey: ['collections', page] });
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h6" color="primary">
                Collections
              </Typography>
              <CreateDialog {...{ create }} libraries={libraries.data} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>
      <Container>
        <CollectionList {...{ page }} />
      </Container>
      <Combinations />
    </>
  );
}

const CreateDialog = ({
  create,
  libraries,
}: {
  create: (name: string, library: string) => void;
  libraries?: PlexLibrary[];
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [library, setLibrary] = useState<string>('');

  const handleCreate = () => {
    if (!value || !library) {
      return;
    }

    setOpen(false);
    setValue('');
    setLibrary('');
    create(value, library);
  };

  return (
    <>
      <IconButton aria-label="refresh" color="primary" onClick={() => setOpen(true)}>
        <QueueIcon />
      </IconButton>
      {open && (
        <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="sm">
          <DialogTitle>Create Collection</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              error={value === ''}
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
              error={library === ''}
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
                  {l.title}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => handleCreate()}>Create</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
