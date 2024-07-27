import React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { Text } from '@dashotv/components';

import { NzbgeekFormMovie, NzbgeekFormTv } from './types';

export type NzbgeekSearchTvProps = {
  form: NzbgeekFormTv;
  submit: (data: NzbgeekFormTv) => void;
};
export function NzbgeekSearchTv({ form, submit }: NzbgeekSearchTvProps) {
  const { handleSubmit, control } = useForm<NzbgeekFormTv>({ values: form });

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, width: '100%' }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Text name="tvdbid" control={control} sx={{ width: '125px' }} />
          <Text name="season" control={control} sx={{ width: '75px' }} />
          <Text name="episode" control={control} sx={{ width: '75px' }} />
          <Button variant="contained" onClick={handleSubmit(submit)}>
            Go
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export type NzbgeekSearchMovieProps = {
  form: NzbgeekFormMovie;
  submit: (data: NzbgeekFormMovie) => void;
};
export function NzbgeekSearchMovie({ form, submit }: NzbgeekSearchMovieProps) {
  const { handleSubmit, control } = useForm<NzbgeekFormMovie>({ values: form });
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, width: '100%' }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Text name="imdbid" control={control} sx={{ width: '125px' }} />
          <Button variant="contained" onClick={handleSubmit(submit)}>
            Go
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
