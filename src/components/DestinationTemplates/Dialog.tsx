import React from 'react';
import { useForm } from 'react-hook-form';

import { DestinationTemplate } from 'client/tower';

import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Stack } from '@mui/system';

import { Text } from '@dashotv/components';

export const DestinationTemplatesDialog = ({
  destinationTemplate,
  submit,
}: {
  destinationTemplate: DestinationTemplate;
  submit: (data: DestinationTemplate | null) => void;
}) => {
  const [open, setOpen] = React.useState(true);
  const { control, handleSubmit } = useForm<DestinationTemplate>({ values: destinationTemplate });

  const close = (data: DestinationTemplate | null) => {
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
            <Text control={control} name="template" />
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
