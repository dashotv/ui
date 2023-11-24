import React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { Text } from 'components/Form';

import { NzbgeekForm } from './types';

export type NzbgeekSearchProps = {
  form: NzbgeekForm;
  setForm: React.Dispatch<React.SetStateAction<NzbgeekForm>>;
};
export function NzbgeekSearch({ form, setForm }: NzbgeekSearchProps) {
  const { handleSubmit, control } = useForm<NzbgeekForm>({ values: form });
  const submit = (data: NzbgeekForm) => {
    setForm(data);
  };
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, width: '100%' }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
          <Text name="tvdbid" control={control} />
          <Text name="season" control={control} />
          <Text name="episode" control={control} />
          <Button variant="contained" onClick={handleSubmit(submit)}>
            Go
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
