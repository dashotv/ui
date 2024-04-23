import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Library } from 'client/tower';

import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Stack } from '@mui/system';

import { Option, Select, Text } from '@dashotv/components';

import { useQueryDestinationTemplates } from 'components/DestinationTemplates';
import { useQueryReleaseTypes } from 'components/ReleaseTypes';

export const LibrariesDialog = ({ library, submit }: { library: Library; submit: (data: Library | null) => void }) => {
  const [open, setOpen] = useState(true);
  const [releaseTypes, setReleaseTypes] = useState<Option[]>([]);
  const [destTemplates, setDestTemplates] = useState<Option[]>([]);
  const { control, handleSubmit } = useForm<Library>({ values: library });
  const { data: releaseTypesData } = useQueryReleaseTypes();
  const { data: destTemplatesData } = useQueryDestinationTemplates();

  const close = (data: Library | null) => {
    submit(data);
    setOpen(false);
  };

  useEffect(() => {
    if (!releaseTypesData) {
      return;
    }
    setReleaseTypes(releaseTypesData.map(item => ({ label: item.name!, value: item.id! }) as Option));
  }, [releaseTypesData]);

  useEffect(() => {
    if (!destTemplatesData) {
      return;
    }
    setDestTemplates(destTemplatesData.map(item => ({ label: item.name!, value: item.id! }) as Option));
  }, [destTemplatesData]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(close)}>
          <Stack direction="column" spacing={2}>
            <Text control={control} name="name" />
            <Text control={control} name="path" />
            <Select control={control} name="release_type_id" options={releaseTypes} />
            <Select control={control} name="destination_template_id" options={destTemplates} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button onClick={() => close(null)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
