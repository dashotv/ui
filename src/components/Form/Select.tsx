import { title } from 'radash';

import React from 'react';
import { Controller } from 'react-hook-form';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { InputProps, Option } from './types';

export interface SelectProps {
  options: Option[];
}
export const Select = ({ name, label, disabled, options, control }: InputProps & SelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          select
          id={name}
          disabled={disabled}
          label={title(label || name)}
          variant="standard"
          fullWidth
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              <span>{option.label}</span>
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
