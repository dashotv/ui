import React from 'react';
import { useForm } from 'react-hook-form';

import { File } from 'client/tower';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Chrono, Megabytes, Text } from '@dashotv/components';

export const FilesDialog = () => {
  return <div>dialog</div>;
};

export const FilesEditDialog = ({
  open,
  file,
  handleClose,
}: {
  open: boolean;
  file: File;
  handleClose: (data: File | null) => void;
}) => {
  const { id, size, created_at, updated_at, modified_at } = file;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { control, handleSubmit } = useForm<File>({ values: file });
  const submit = (data: File) => {
    // update.mutate(episode);
    handleClose(data);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen} maxWidth="md">
      <DialogTitle>
        <Typography>Edit File ({id})</Typography>
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
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
          <Stack width="100%" direction="column" spacing={1}>
            <Text name="name" control={control} />
            <Text name="extension" control={control} />
            <Stack direction="row" spacing="1" justifyContent="space-between">
              <Stack direction="row" spacing={1} width="80%" alignItems="center" justifyContent="start">
                {size ? <Megabytes value={size} ord="bytes" /> : null}
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1" color="primary">
                    created
                  </Typography>
                  <Typography variant="body1" color="primary.dark">
                    <Chrono fromNow stamp={created_at} />
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1" color="primary">
                    updated
                  </Typography>
                  <Typography variant="body1" color="primary.dark">
                    <Chrono fromNow stamp={updated_at} />
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1" color="primary">
                    modified
                  </Typography>
                  <Typography variant="body1" color="primary.dark">
                    {modified_at ? <Chrono fromNow stamp={new Date(modified_at * 1000).toISOString()} /> : null}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1} width="20%" alignItems="center" justifyContent="end">
                <Button variant="contained" onClick={() => handleClose(null)}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Ok
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
