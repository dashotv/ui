import { title } from 'radash';

import React from 'react';
import { Controller } from 'react-hook-form';

import MUICheckbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { InputProps } from './types';

export const Checkbox = ({ name, label, control }: InputProps) => {
  //   error={!!errors[name]}
  //   helperText={errors[name]?.message}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl variant="standard" fullWidth>
          <FormControlLabel
            control={<MUICheckbox {...field} checked={field.value} id={name} />}
            label={title(label || name)}
          />
        </FormControl>
      )}
    />
  );
};
export interface IconCheckboxProps {
  icon: React.ReactNode;
  checkedIcon: React.ReactNode;
}
export const IconCheckbox = ({ name, label, icon, checkedIcon, control }: InputProps & IconCheckboxProps) => {
  //   error={!!errors[name]}
  //   helperText={errors[name]?.message}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl variant="standard">
          <FormControlLabel
            control={<MUICheckbox {...field} icon={icon} checkedIcon={checkedIcon} checked={field.value} id={name} />}
            label=""
            title={title(label || name)}
          />
        </FormControl>
      )}
    />
  );
};
