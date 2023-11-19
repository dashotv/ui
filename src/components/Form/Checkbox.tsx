import { title } from 'radash';

import React from 'react';
import { Controller } from 'react-hook-form';

import MUICheckbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { InputProps } from './types';

export const Checkbox = ({ name, label, disabled, control, sx, onChange }: InputProps) => {
  //   error={!!errors[name]}
  //   helperText={errors[name]?.message}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl variant="standard" fullWidth>
          <FormControlLabel
            sx={sx}
            control={
              <MUICheckbox
                {...field}
                id={name}
                disabled={disabled}
                checked={field.value}
                onChange={e => {
                  onChange && onChange(e);
                  field.onChange(e);
                }}
              />
            }
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
export const IconCheckbox = ({
  name,
  label,
  icon,
  disabled,
  checkedIcon,
  control,
  sx,
  onChange,
}: InputProps & IconCheckboxProps) => {
  //   error={!!errors[name]}
  //   helperText={errors[name]?.message}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl variant="standard">
          <FormControlLabel
            sx={sx}
            control={
              <MUICheckbox
                {...field}
                icon={icon}
                disabled={disabled}
                checkedIcon={checkedIcon}
                checked={field.value}
                id={name}
                onChange={onChange}
              />
            }
            label=""
            title={title(label || name)}
          />
        </FormControl>
      )}
    />
  );
};
