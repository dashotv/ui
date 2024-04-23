import React from 'react';
import { useForm } from 'react-hook-form';

import { ReleaseType } from 'client/tower';

import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Stack } from '@mui/system';

import { Text } from '@dashotv/components';

export const ReleaseTypesDialog = ({
  releaseType,
  submit,
}: {
  releaseType: ReleaseType;
  submit: (data: ReleaseType | null) => void;
}) => {
  const [open, setOpen] = React.useState(true);
  const { control, handleSubmit } = useForm<ReleaseType>({ values: releaseType });

  const close = (data: ReleaseType | null) => {
    submit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(close)}>
          <Stack direction="column" spacing={2}>
            <Text control={control} name="name" />
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
