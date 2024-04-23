import React from 'react';

import { DestinationTemplate } from 'client/tower';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import QueueIcon from '@mui/icons-material/Queue';
import { IconButton, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { LoadingIndicator, Row } from '@dashotv/components';

import { DestinationTemplatesDialog } from './Dialog';
import {
  useMutationDestinationTemplate,
  useMutationDestinationTemplateCreate,
  useMutationDestinationTemplateDelete,
  useQueryDestinationTemplates,
} from './query';

export const DestinationTemplatesList = () => {
  const [editing, setEditing] = React.useState<DestinationTemplate | null>(null);
  const { data, isFetching } = useQueryDestinationTemplates();
  const creator = useMutationDestinationTemplateCreate();
  const deleter = useMutationDestinationTemplateDelete();
  const updater = useMutationDestinationTemplate();

  const create = (data: DestinationTemplate) => {
    setEditing(null);
    creator.mutate(data);
  };
  const update = (data: DestinationTemplate) => {
    setEditing(null);
    if (!data.id) {
      throw new Error('ID must be set');
    }
    updater.mutate({ id: data.id, data });
  };
  const save = (data: DestinationTemplate | null) => {
    setEditing(null);
    if (!data) {
      return;
    }
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
          Destination Templates
        </Typography>
        <IconButton size="small" onClick={() => setEditing({ name: '' })}>
          <QueueIcon fontSize="small" color="primary" />
        </IconButton>
      </Stack>
      {(data || []).map((destinationTemplate, index) => (
        <Row key={index}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="body1" fontWeight="bolder" minWidth="100px">
                {destinationTemplate.name}
              </Typography>
              <Typography variant="caption" fontWeight="bolder" color="gray">
                {destinationTemplate.template}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => setEditing(destinationTemplate)}>
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
              <IconButton size="small" onClick={() => destinationTemplate?.id && remove(destinationTemplate.id)}>
                <DeleteForeverIcon fontSize="small" color="error" />
              </IconButton>
            </Stack>
          </Stack>
        </Row>
      ))}
      {editing && <DestinationTemplatesDialog destinationTemplate={editing} submit={save} />}
    </Paper>
  );
};
