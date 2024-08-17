import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Combination } from 'client/tower';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import QueueIcon from '@mui/icons-material/Queue';
import { Paper, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { Chrono, Container, LoadingIndicator, Row } from '@dashotv/components';

import { useCollectionsQuery } from 'components/Collections';

import {
  useCombinationCreateMutation,
  useCombinationDeleteMutation,
  useCombinationMutation,
  useCombinationsQuery,
} from './query';

export const Combinations = () => {
  const [selected, setSelected] = useState<Combination | undefined>(undefined);

  useEffect(() => {
    console.log('selection: ', selected);
  }, [selected]);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h6" color="primary">
                Combinations
              </Typography>
              <CreateDialog open={setSelected} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>
      <Container>
        <CombinationsList {...{ setSelected }} />
      </Container>
      {selected !== undefined && <CombinationDialog setOpen={setSelected} combination={selected} />}
    </>
  );
};

export const CombinationsList = ({ setSelected }: { setSelected: (v?: Combination) => void }) => {
  const { isFetching, data } = useCombinationsQuery();
  const remover = useCombinationDeleteMutation();
  const remove = (id: string) => {
    remover.mutate(id);
  };
  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {isFetching && <LoadingIndicator />}
      {data?.result.map(combination => (
        <Row key={combination.id}>
          <Stack spacing={1} direction="row" alignItems="center" width="100%" justifyContent="space-between">
            <Stack spacing={1} direction="row" alignItems="center" width="100%" justifyContent="flex-start">
              <Link to={`/collections/combinations/${combination.name}`}>
                <Typography noWrap fontWeight="bolder" color="primary">
                  {combination.name}
                </Typography>
              </Link>
            </Stack>

            <Stack spacing={1} direction="row" justifyContent="flex-end" alignItems="center" width="100%">
              <Typography noWrap fontWeight="bolder" color="action" pr={1}>
                {combination.collections && combination.collections.length}
              </Typography>
              <Typography variant="subtitle2" color="gray" noWrap minWidth="0">
                <Chrono fromNow>{combination.updated_at}</Chrono>
              </Typography>
              <IconButton aria-label="refresh" color="primary" size="small" onClick={() => setSelected(combination)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="refresh"
                color="error"
                size="small"
                onClick={() => combination.id && remove(combination.id)}
              >
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Paper>
  );
};

const CreateDialog = ({ open }: { open: (v?: Combination) => void }) => {
  const openDialog = () => {
    console.log('openDialog');
    open({ name: '', collections: [] });
  };
  return (
    <IconButton aria-label="refresh" color="primary" onClick={() => openDialog()}>
      <QueueIcon />
    </IconButton>
  );
};

const CombinationDialog = ({
  setOpen,
  combination,
}: {
  setOpen: (v?: Combination) => void;
  combination?: Combination;
}) => {
  const update = useCombinationMutation();
  const create = useCombinationCreateMutation();
  const { data: collections } = useCollectionsQuery(1);

  const [value, setValue] = useState<string>(combination?.name || '');
  const [selected, setSelected] = useState<string[]>(combination?.collections || []);

  // if (!combination?.id) {
  //   return null;
  // }

  const onChange = (collectionId: string, checked: boolean) => {
    if (checked) {
      setSelected(prev => [...prev, collectionId]);
    } else {
      setSelected(selected.filter(id => id !== collectionId));
    }
  };

  const handleCreate = () => {
    if (!value || !selected || !selected.length) {
      return;
    }

    if (!combination?.id) {
      create.mutate({ name: value, collections: selected }, { onSuccess: () => setOpen() });
      return;
    }
    update.mutate({ id: combination.id, name: value, collections: selected }, { onSuccess: () => setOpen() });
  };

  return (
    <>
      <Dialog onClose={() => setOpen()} open={true} fullWidth maxWidth="sm">
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
          <FormGroup>
            {collections?.result?.map(collection => (
              <FormControlLabel
                key={collection.id}
                control={<Checkbox checked={collection?.id ? selected.includes(collection.id) : false} />}
                label={collection.name}
                value={collection.id}
                onChange={(event: SyntheticEvent<Element, Event>, checked: boolean) =>
                  onChange(collection.id!, checked)
                }
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen()}>Cancel</Button>
          <Button onClick={() => handleCreate()}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
