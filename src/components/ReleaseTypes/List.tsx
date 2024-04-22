import React from 'react';

import { ReleaseType } from 'client/tower';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import QueueIcon from '@mui/icons-material/Queue';
import { IconButton, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { LoadingIndicator, Row } from '@dashotv/components';

import { ReleaseTypesDialog } from './Dialog';
import {
  useMutationReleaseType,
  useMutationReleaseTypeCreate,
  useMutationReleaseTypeDelete,
  useQueryReleaseTypes,
} from './query';

export const ReleaseTypesList = () => {
  const [editing, setEditing] = React.useState<ReleaseType | null>(null);
  const { data, isFetching } = useQueryReleaseTypes();
  const creator = useMutationReleaseTypeCreate();
  const deleter = useMutationReleaseTypeDelete();
  const updater = useMutationReleaseType();

  const create = (data: ReleaseType) => {
    setEditing(null);
    creator.mutate(data);
  };
  const update = (data: ReleaseType) => {
    setEditing(null);
    if (!data.id) {
      throw new Error('ID must be set');
    }
    updater.mutate({ id: data.id, data });
  };
  const save = (data: ReleaseType) => {
    if (!data?.id) {
      create(data);
      return;
    }
    update(data);
  };
  const remove = (id: string) => {
    deleter.mutate(id);
  };

  return (
    <Paper elevation={0} sx={{ p: 1, mb: 2 }}>
      {isFetching && <LoadingIndicator />}
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" color="primary">
          Release Types
        </Typography>
        <IconButton size="small" onClick={() => setEditing({ name: '' })}>
          <QueueIcon fontSize="small" color="primary" />
        </IconButton>
      </Stack>
      {(data || []).map((releaseType, index) => (
        <Row key={index}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Typography variant="body1" fontWeight="bolder">
              {releaseType.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => setEditing(releaseType)}>
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
              <IconButton size="small" onClick={() => releaseType?.id && remove(releaseType.id)}>
                <DeleteForeverIcon fontSize="small" color="error" />
              </IconButton>
            </Stack>
          </Stack>
        </Row>
      ))}
      {editing && <ReleaseTypesDialog releaseType={editing} submit={save} />}
    </Paper>
  );
};
