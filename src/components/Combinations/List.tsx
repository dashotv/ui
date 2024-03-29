import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';

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
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import { useCollectionsQuery } from 'components/Collections';
import { Chrono, LoadingIndicator, Row } from 'components/Common';
import { Container } from 'components/Layout';

import { useCombinationMutation, useCombinationsQuery } from './query';
import { Combination } from './types';

export const Combinations = () => {
  const [selected, setSelected] = useState<Combination | undefined>(undefined);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h6" color="primary">
                Combinations
              </Typography>
              <CreateDialog open={setSelected} />
            </Stack>
          </Grid>
          <Grid xs={12} md={6}></Grid>
        </Grid>
      </Container>
      <Container>
        <CombinationsList {...{ setSelected }} />
      </Container>
      {!!selected && <CombinationDialog setOpen={setSelected} combination={selected} />}
    </>
  );
};

export const CombinationsList = ({ setSelected }: { setSelected: (v?: Combination) => void }) => {
  const { isFetching, data } = useCombinationsQuery();
  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {isFetching && <LoadingIndicator />}
      {data?.map(combination => (
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
                <Chrono fromNow>{combination.created_at}</Chrono>
              </Typography>
              <IconButton aria-label="refresh" color="primary" size="small" onClick={() => setSelected(combination)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Paper>
  );
};

const CreateDialog = ({ open }: { open: (v?: Combination) => void }) => {
  return (
    <IconButton aria-label="refresh" color="primary" onClick={() => open({ name: '', collections: [] })}>
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
  const create = useCombinationMutation();
  const { data: collections } = useCollectionsQuery(1);

  const [value, setValue] = useState<string>(combination?.name || '');
  const [selected, setSelected] = useState<string[]>(combination?.collections || []);

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

    create.mutate({ name: value, collections: selected }, { onSuccess: () => setOpen() });
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
            {collections?.results?.map(collection => (
              <FormControlLabel
                key={collection.id}
                control={<Checkbox checked={selected.includes(collection.id)} />}
                label={collection.name}
                value={collection.id}
                onChange={(event: SyntheticEvent<Element, Event>, checked: boolean) => onChange(collection.id, checked)}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen()}>Cancel</Button>
          <Button onClick={() => handleCreate()}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
