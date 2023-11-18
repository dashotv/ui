import { title } from 'radash';

import React from 'react';
import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { InputProps } from './types.d';

export const Text = ({ name, label, control }: InputProps) => {
  //   error={!!errors[name]}
  //   helperText={errors[name]?.message}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField {...field} id={name} label={title(label || name)} variant="standard" fullWidth />
      )}
    />
  );
};
